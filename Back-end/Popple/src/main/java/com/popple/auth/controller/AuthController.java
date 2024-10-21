package com.popple.auth.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.popple.auth.domain.request.SignUpRequest;
import com.popple.auth.domain.request.UserDeleteRequest;
import com.popple.auth.domain.request.UserEditRequest;
import com.popple.auth.domain.response.LoginResponse;
import com.popple.auth.domain.response.SignUpResponse;
import com.popple.auth.entity.User;
import com.popple.auth.service.AuthService;
import com.popple.common.utils.TokenUtils;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
@Tag(name = "Auth", description = "사용자 로그인 관련 API")
@RequestMapping("/api/auth")

public class AuthController {
	private final TokenUtils tokenUtils;
	private final AuthService authService;
	
	//회원가입
	@Operation(summary = "회원가입", description = "회원가입을 진행합니다.")
	@PostMapping("/create")
	public ResponseEntity<SignUpResponse> signUp(@RequestBody SignUpRequest req){
		log.info("[SignUp] 회원가입 정보 : {}", req);
		SignUpResponse signUpResponse =  authService.signUp(req);
		return ResponseEntity.status(HttpStatus.CREATED).body(signUpResponse);
	}
	
	//이메일 중복 확인
	@Operation(summary = "이메일 중복 확인", description = "중복이 아니면 true 중복이면 false 반환.")
	@GetMapping("/email")
	public ResponseEntity<Boolean> emailCheck(@RequestParam String email){
		boolean isNotDuplicate = authService.duplicateEmailCheck(email);
		return ResponseEntity.ok(isNotDuplicate);
		
	}
	
	//닉네임 중복 확인
	@Operation(summary = "닉네임 중복 확인", description = "중복이 아니면 true 중복이면 false 반환.")
	@GetMapping("/nickname")
	public ResponseEntity<Boolean> nicknameCheck(@RequestParam String nickname){
		boolean isNotDuplicate = authService.duplicateNicknameCheck(nickname);
		return ResponseEntity.ok(isNotDuplicate);
	}

	//회원 탈퇴
	@Operation(summary = "회원탈퇴", description = "회원탈퇴를 진행합니다.")
	@PatchMapping("/delete/{id}")
	public ResponseEntity<?> deleteUser(@RequestBody UserDeleteRequest userDeleteRequest){
		authService.deleteUser(userDeleteRequest);
		if(!userDeleteRequest.getEmail().isEmpty()) {
			return ResponseEntity.ok(null);
		}else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자를 찾을 수 없음");
		}
	}
	
	//회원 정보 수정
	@Operation(summary = "회원수정", description = "회원수정을 진행합니다.")
	@PatchMapping("/update/{id}")
	public ResponseEntity<SignUpResponse> updateUser(@AuthenticationPrincipal User user,@RequestBody UserEditRequest userEditRequest){
		SignUpResponse updateUser = authService.updateUser(user, userEditRequest);
		return ResponseEntity.ok(updateUser);
		
	}
	
	//토큰 재발급
	@Operation(summary = "토큰 재발급", description = "토큰을 재발급합니다.")
	@PostMapping("/refresh-token")
	public ResponseEntity<LoginResponse> refreshToken(HttpServletRequest req, HttpServletResponse res){
		Map<String, String> tokenMap = authService.refreshToken(req);
		
		if(tokenMap == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}
		tokenUtils.setRefreshTokenCookie(res, tokenMap.get("refreshToken"));
		
		return ResponseEntity.ok(LoginResponse.builder().accessToken(tokenMap.get("accessToken")).build());
	}
	
}
