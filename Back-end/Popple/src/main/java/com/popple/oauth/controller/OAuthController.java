package com.popple.oauth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.popple.auth.domain.OAuthUserInfo;
import com.popple.auth.domain.response.LoginResponse;
import com.popple.oauth.service.OAuthService;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/oauth")
@RequiredArgsConstructor
public class OAuthController {
	private final OAuthService oAuthService;
	
	@GetMapping("/{provider}")
	public ResponseEntity<?> OauthSignIn(@RequestParam("code") final String code, HttpServletResponse res, @PathVariable("provider") final String provider) {
		log.info("[OauthSignIn] code 정보 : {}", code);
		OAuthUserInfo oAuthUserInfo = oAuthService.oAuthUser(code, provider);
		// 이미 가입된 회원이면 로그인 처리
		if (oAuthUserInfo.isAbleToLogin()) {
			return oAuthLogin(oAuthUserInfo, res); // -> TOKEN 반환
		}
		// 가입 안한 최초 Oauth 인증자는 추가 정보를 얻기 위해  OAuthUserInfo response;
		return ResponseEntity.ok(oAuthUserInfo); // ->  OAuthUserInfo 객체 반환
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> oAuthLogin(@RequestBody OAuthUserInfo oAuthUserInfo, HttpServletResponse res) {
		log.info(oAuthUserInfo.toString());
		try {
			if (oAuthUserInfo.isAbleToLogin()) {
				String accessToken = oAuthService.oAuthSignUpAndLogin(oAuthUserInfo, res);
				LoginResponse loginResponse = LoginResponse
						.builder()
						.accessToken(accessToken)
						.build();
				return ResponseEntity.ok(loginResponse);				
			} else {
				throw new Exception();
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}

}
