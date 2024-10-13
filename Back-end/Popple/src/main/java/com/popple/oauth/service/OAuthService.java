package com.popple.oauth.service;

import java.time.LocalDate;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.popple.auth.entity.User;
import com.popple.auth.repository.UserRepository;
import com.popple.common.utils.OAuth2Properties;
import com.popple.common.utils.TokenUtils;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OAuthService {
	private final OAuth2Properties oAuth2Properties;
	private final UserRepository userRepository;
	private final TokenUtils tokenUtils;
	
	public String oAuthSignIn(String code, String provider, HttpServletResponse res) {
		// code를 통해 provider에서 제공하는 accessToken을 가져오기
		String providedAccessToken = getAccessToken(code, provider);
		// provider에서 제공하는 accessToken으로 사용자 정보를 추출
		User user = generateOAuthUser(providedAccessToken, provider);
		// 사용자 정보를 조회하고
		// 기존에 있는 사용자라면 (oauth 인증 여부에 따라 oauth = true로 변경)
		// 기존에 없는 사용자라면 (새로 가입 _ DB 추가)
		user = userRepository.findByEmailAndDeletedAtIsNull(user.getEmail());
		// 임시
		
		if (!user.isOAuth()) {
			user.setOAuth(true);
		}
		// 자동 로그인(사용자에 대한 정보로 accessToken과 refreshToken을 만들어서 반환)
		Map<String, String> tokenMap = tokenUtils.generateToken(user);
		// DB에 기록(refresh)
		user.setRefreshToken(tokenMap.get("refreshToken"));
		userRepository.save(user);
		// Header에 추가
		tokenUtils.setRefreshTokenCookie(res, tokenMap.get("refreshToken"));
		// Body에 추가(access)
		return tokenMap.get("accessToken");
	}

	private User generateOAuthUser(String providedAccessToken, String provider) {
		// TODO Auto-generated method stub
		return null;
	}

	private String getAccessToken(String code, String provider) {
		// TODO Auto-generated method stub
		return null;
	}
}
