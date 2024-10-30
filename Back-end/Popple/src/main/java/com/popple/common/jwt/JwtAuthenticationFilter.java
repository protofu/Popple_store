package com.popple.common.jwt;

import java.io.IOException;

import org.springframework.lang.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	private final JwtProvider jwtProvider;
	private final static String HEADER_AUTHORIZATION = "Authorization";
	private final static String TOKEN_PREFIX = "Bearer ";

	// HTTP 요청이 들어올 때마다 실행되는 필터
	@Override
	protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
			throws ServletException, IOException {
		String header = request.getHeader(HEADER_AUTHORIZATION);
		log.info("요청된 헤더 값 : {}", header);
		String token = getAccessToken(header);
		// 토큰이 유효하다면
		if (token != null && jwtProvider.validateToken(token)) {
			// 사용자 정보를 담은 authentication를 받아와서
			Authentication authentication = jwtProvider.getAuthenticationByToken(token);
			// 인증 정보를 저장
			SecurityContextHolder.getContext().setAuthentication(authentication);
		}
		// 현재 필터를 처리한 후 다음 필터로 요청
		filterChain.doFilter(request, response);
	}

	private String getAccessToken(String header) {
		log.info("[getAccessToken] 토큰 값 추출 : {}", header);
		// 헤더값이 null이 아니고, Bearer로 시작하면
		if (header != null && header.startsWith(TOKEN_PREFIX)) {
			// Bearer를 제외한 나머지 문자열 반환
			return header.substring(TOKEN_PREFIX.length());
		}
		return null;
	}
	
	
}
