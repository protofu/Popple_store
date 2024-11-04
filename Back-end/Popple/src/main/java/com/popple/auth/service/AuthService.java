package com.popple.auth.service;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.popple.auth.domain.request.SignUpRequest;
import com.popple.auth.domain.request.UserDeleteRequest;
import com.popple.auth.domain.request.UserEditRequest;
import com.popple.auth.domain.response.SignUpResponse;
import com.popple.auth.entity.User;
import com.popple.auth.repository.UserRepository;
import com.popple.common.jwt.JwtProvider;
import com.popple.common.utils.TokenUtils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
	private final UserRepository userRepository;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	private final TokenUtils tokenUtils;
	private final JwtProvider jwtProvider;

	// 회원 저장
	public SignUpResponse signUp(SignUpRequest req) {
		String encodedPassword = bCryptPasswordEncoder.encode(req.getPassword());

		User user = User.builder().email(req.getEmail()).name(req.getName()).birth(req.getBirth())
				.nickname(req.getNickname()).password(encodedPassword).gender(req.isGender()).build();
		log.info("user : {}", user);
		User savedUser = userRepository.save(user);
		return SignUpResponse.toDTO(savedUser);
	}

	// 회원 수정
	public SignUpResponse updateUser(User user, UserEditRequest userEditRequest) {
		User updateUser = userRepository.findById(user.getId())
				.orElseThrow(() -> new IllegalArgumentException("해당 유저를 찾을 수 없음"));
		if (user.getId() == updateUser.getId()) {
			if (userEditRequest.getPassword() != null) {
				updateUser.setPassword(userEditRequest.getPassword());

			}
			if (userEditRequest.getNickname() != null) {
				updateUser.setNickname(userEditRequest.getNickname());
			}
			userRepository.save(updateUser);
		}

		return SignUpResponse.toDTO(updateUser);
	}

	// 이메일 중복 체크
	public boolean duplicateEmailCheck(String email) {
		return !userRepository.existsByEmailAndDeletedAtIsNull(email);
	}

	public boolean duplicateNicknameCheck(String nickname) {
		return !userRepository.existsByNicknameAndDeletedAtIsNull(nickname);
	}

	// 회원탈퇴
	public void deleteUser(UserDeleteRequest userDeleteRequest) {
		User user = userRepository.findByEmailAndDeletedAtIsNull(userDeleteRequest.getEmail())
				.orElseThrow(() -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다."));

		// user가 null이라면 찾을 수 없다는 에러 메세지 던지기
		if (user == null) {
			throw new UsernameNotFoundException("유저를 찾을 수 없음");
		}
		// 입력한 password를 암호화된 password와 비교 후 틀리면 에러 던지기
		if (!bCryptPasswordEncoder.matches(user.getPassword(), userDeleteRequest.getPassword())) {
			throw new RuntimeException("이메일 또는 비밀번호가 틀렸습니다");
		}
		// deletedAt을 현재 시간으로 설정 후 업데이트
		user.setDeletedAt(LocalDateTime.now());
		userRepository.save(user);

	}

	// 토큰 추출 함수
	private String extractRefreshTokenFromCookie(HttpServletRequest req) {
		// 쿠키들을 가져옵니다
		Cookie[] cookies = req.getCookies();

		// 쿠키가 있다면
		if (cookies != null) {
			// 쿠키를 하나씩 보고
			for (Cookie c : cookies) {
				// 만약 refreshToken에 해당하는 key값이 있다면
				if (c.getName().equals("refreshToken")) {
					// 해당 value값(refreshToken)을 반환
					return c.getValue();
				}
			}
		}
		// 없다면 null 반환
		return null;

	}

	// 토큰 재발급
	public Map<String, String> refreshToken(HttpServletRequest req) {
		// 쿠키에서 RefreshToken 추출
		String refreshToken = extractRefreshTokenFromCookie(req);
		// 토큰이 없거나 유효한 토큰이 아니라면 null 반환
		if (refreshToken == null || !jwtProvider.validateToken(refreshToken)) {
			return null;
		}
		// 유효한 토큰에서 이메일 추출
		String userEmail = jwtProvider.getUserEmailByToken(refreshToken);
		log.info("추출한 이메일 : {}", userEmail);
		// 이메일을 통해 사용자를 조회하고 refreshToken 비교
		User user = userRepository.findByEmailAndDeletedAtIsNull(userEmail)
				.orElseThrow(() -> new IllegalArgumentException("해당 유저 찾을 수 없습니다."));
		// user가 없거나 user의 refreshToken이 같지 않다면 null 반환
		if (user == null || refreshToken != user.getRefreshToken()) {
			return null;
		}
		// 새로운 토큰 생성 후 DB에 refreshToken 저장
		Map<String, String> tokenMap = tokenUtils.generateToken(user);
		user.setRefreshToken(tokenMap.get("refreshToken"));
		userRepository.save(user);
		return tokenMap;
	}

	public SignUpResponse getUser(Long id) {
		User user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다"));
		SignUpResponse res = SignUpResponse.toDTO(user);
		return res;
	}

	// 사용자 비밀번호 체크
	public boolean checkPassword(User user, String password) {
    boolean isMatch = bCryptPasswordEncoder.matches(password, user.getPassword());
		log.info("비밀번호 맞냐? : {}", isMatch);
    if (!isMatch) {
        throw new RuntimeException("비밀번호가 일치하지 않습니다.");
    }
		return true;
	}


}
