package com.popple.oauth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.popple.auth.domain.LoginResponse;
import com.popple.oauth.service.OAuthService;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/oauth")
@RequiredArgsConstructor
public class OAuthController {
	private OAuthService oAuthService;
	
	@GetMapping("/{provider}")
	public ResponseEntity<LoginResponse> OauthSignIn(@RequestParam("code") final String code, HttpServletResponse res, @PathVariable("provider") final String provider) {
		log.info("[OauthSignIn] code 정보 : {}", code);
		String accessToken = oAuthService.oAuthSignIn(code, provider, res);
		// code를 통해 사용자 정보를 받아서
		// 사용자 정보를 조회하고
		// 만약 기존에 있는 사용자라면 (oauth 값을 true로 변경)
		// 만약 기존에 없는 사용자라면 (새로 가입 _ DB 추가)
		// 사용자에 대한 정보로 accessToken과 refreshToken을 만들어서 반환
		if (accessToken == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}
		
		LoginResponse loginResponse = LoginResponse
			.builder()
			.accessToken(accessToken)
			.build();
		return ResponseEntity.ok(loginResponse);
	}
}
