package com.popple.common.config;

import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import com.popple.auth.repository.UserRepository;
import com.popple.common.jwt.JwtAuthenticationFilter;
import com.popple.common.jwt.JwtAuthenticationService;
import com.popple.common.jwt.JwtProperties;
import com.popple.common.jwt.JwtProvider;
import com.popple.common.jwt.LoginCustomAuthenticationFilter;
import com.popple.common.utils.TokenUtils;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {
	private final UserDetailsService userDetailsService;
	private final UserRepository userRespository;
	private final JwtProperties jwtProperties;
	
	// JWT Provider 생성자 호출
	private JwtProvider jwtProvider() {
		return new JwtProvider(userDetailsService, jwtProperties);
	}
	
	// TokenUtils 생성자 호출
	private TokenUtils tokenUtils() {
		return new TokenUtils(jwtProvider());
	}
	
	// JwtAuthenticationService 생성자 호출
	private JwtAuthenticationService jwtAuthenticationService() {
		return new JwtAuthenticationService(tokenUtils(), userRespository);
	}
	
	@Bean
	AuthenticationManager authenticationManager() {
		// DB에서 사용자 정보를 불러와 인증을 처리하기 위해 생성
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		// 사용자 정보를 사용자 이름(email)을 통해 불러오기
		authProvider.setUserDetailsService(userDetailsService);
		// BCrypt를 사용하여 비밀번호 검증
		authProvider.setPasswordEncoder(bCryptPasswordEncoder());
		// 위 설정(authProvider)을 통해 사용자를 검증하고 성공시 Authentication 객체반환
		// Authentication 예시 -> Principal, Credentials, Authorities(ROLE), Authenticated, Details
		return new ProviderManager(authProvider);
	}
	
	// 암호화 빈 객체 생성 (스프링의 BCryptPasswordEncoder 암호화를 사용)
	@Bean
	BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	// HTTP 요청에 따른 보안 구성
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		// 특정 URL에 대한 접근 설정
		http.authorizeHttpRequests(auth ->
			auth
//			.requestMatchers(
//			)
			.anyRequest().permitAll() // 임시적 모두 허용
		);
		
		// 무상태성 세션 관리
		http.sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		
		// 특정 경로(로그인)에 대한 필터 추가 [authenticationManager, jwtAuthenticationService 생성자를 호출해 매개변수로 등록]
		http.addFilterBefore(new LoginCustomAuthenticationFilter(authenticationManager(), jwtAuthenticationService()), UsernamePasswordAuthenticationFilter.class);
		
		// (토큰을 통해 검증할 수 있도록) 필터 추가 [jwtProvider 생성자를 호출해 매개변수로 등록]
		http.addFilterAfter(new JwtAuthenticationFilter(jwtProvider()), UsernamePasswordAuthenticationFilter.class);
		
		// HTTP 기본 설정
		http.httpBasic(HttpBasicConfigurer::disable);
		// CSRF 비활성화
		http.csrf(AbstractHttpConfigurer::disable);
		// CORS 비활성화
		http.cors(corsConfig -> corsConfig.configurationSource(corsConfigurationSource()));
		
		return http.getOrBuild();			
	}

	private CorsConfigurationSource corsConfigurationSource() {
		return request -> {
			// CORS 정책 속성 설정을 위해 생성
			CorsConfiguration config = new CorsConfiguration();
			// 요청에 대해 허용되는 헤더 목록 설정 -> *를 통해 모든 헤더 허용
			config.setAllowedHeaders(Collections.singletonList("*"));
			// 허용되는 HTTP 메서드 목록 설정 -> *를 통해 모든 메서드 허용(GET, POST...)
			config.setAllowedMethods(Collections.singletonList("*"));
			// 허용할 도메인 패턴 설정 -> 클라이언트 도메인을 해주면됩니다.
			config.setAllowedOriginPatterns(Collections.singletonList("http://localhost:5173"));
			// 자격증명(쿠키, 인증 헤더 ...)을 포함한 요청을 허용할지 결정 -> true 설정으로 클라이언트가 자격증명 요청을 서버로 전송 가능
			config.setAllowCredentials(true);
			return config;
		};
	}
}
