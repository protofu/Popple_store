package com.popple.common.jwt;

import java.io.IOException;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.popple.auth.domain.LoginRequest;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class LoginCustomAuthenticationFilter extends AbstractAuthenticationProcessingFilter{
	private JwtAuthenticationService jwtAuthenticationService;
	
	private static final AntPathRequestMatcher LOGIN_PATH = new AntPathRequestMatcher("/api/auth/login", "POST"); // 설정해야함
	
	public LoginCustomAuthenticationFilter(
			AuthenticationManager authenticationManager,
			JwtAuthenticationService jwtAuthenticationService) {
		super(LOGIN_PATH);											// AbstractAuthenticationProcessingFilter <- 여기로 전달
		setAuthenticationManager(authenticationManager);			// AuthenticationManager 설정	
		this.jwtAuthenticationService = jwtAuthenticationService;	// JwtAuthenticationManager를 필드에 할당
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException, IOException, ServletException {
		// POST, /api/auth/???? 에 요청이 들어오면 진행
		LoginRequest loginRequest = null;
		// Body 로그인 정보 ({"email": ~~, "password": ~~}) 가져오기
		try {
			log.info("[attemptAuthentication] 로그인 정보 가져오기");
			ObjectMapper objectMapper = new ObjectMapper();
			loginRequest = objectMapper.readValue(request.getInputStream(), LoginRequest.class);
		} catch(Exception e) {
			throw new RuntimeException("로그인 요청 이름 확인 필요(로그인 실패)");
		}
		// email과 password를 기반으로 AuthenticationToken 생성
		log.info("[attemptAuthentication] AuthenticationToken 생성");
		UsernamePasswordAuthenticationToken uPAT = new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword());
		// 인증 시작 (AuthenticationManager의 authenticate 메서드가 작동할 때 -> loadByUserName)
		log.info("[attemptAuthentication] 인증 시작");
		Authentication authenticate = getAuthenticationManager().authenticate(uPAT);
		return authenticate;
	}
	
	@Transactional
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		log.info("[successfulAuthentication] 로그인 성공 -> 토큰 생성 시작");
		jwtAuthenticationService.successAuthentication(response, authResult);
	}
}
