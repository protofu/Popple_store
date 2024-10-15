package com.popple.common.utils;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.popple.auth.domain.response.LoginResponse;
import com.popple.auth.entity.User;
import com.popple.common.jwt.JwtProvider;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class TokenUtils {
	private final JwtProvider jwtProvider;
	
	// 토큰 생성
	public Map<String, String> generateToken(User user) {
		String accessToken = jwtProvider.generateAccessToken(user);
		String refreshToken = jwtProvider.generateRefreshToken(user);
		
		Map<String, String> tokenMap = new HashMap<String, String>();
		tokenMap.put("accessToken", accessToken);
		tokenMap.put("refreshToken", refreshToken);
		return tokenMap;
	}
	
	public void setRefreshTokenCookie(HttpServletResponse res, String refreshToken) {
		Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
		refreshTokenCookie.setHttpOnly(true); 				// JavaScript에서 변경 불가
		refreshTokenCookie.setSecure(false); 				// HTTP가 아니여도 사용 가능
		refreshTokenCookie.setPath("/");
		refreshTokenCookie.setMaxAge(24*60*60*1);			// Token 유효기간 1일
		res.addCookie(refreshTokenCookie);
	}
	
	// Json 응답 전송
	public void writeResponse(HttpServletResponse res, LoginResponse loginResponse) throws IOException {
		// 자바 객체를 Json 문자열로 직렬화 or Json 문자열을 자바 객체로 역직렬화 하기 위해
		ObjectMapper objectMapper = new ObjectMapper();
		// loginResponse를 Json 문자열로 변환하여 jsonResponse에 담기
		String jsonResponse = objectMapper.writeValueAsString(loginResponse);
		
		// 응답 콘텐츠 타입을 Json으로 설정
		res.setContentType("application/json");
		// 인코딩을 UTF-8fh 설정
		res.setCharacterEncoding("UTF-8");
		// jsonResponse를 본문에 기록하고 전송
		res.getWriter().write(jsonResponse);
	}
}
