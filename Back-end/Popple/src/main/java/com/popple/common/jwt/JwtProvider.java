package com.popple.common.jwt;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.popple.auth.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtProvider {
	private final UserDetailsService userDetailsService;
	private final JwtProperties jwtProperties;
	
	// accessToken 생성
	public String generateAccessToken(User user) {
		log.info("[generateAccessToken] 액세스 토큰 생성");
		Date now = new Date();
		// 만료 시간 = 현재시각 + 설정한 유지 시간
		Date expiredDate = new Date(now.getTime() + jwtProperties.getAccessDuration());
		// 생성
		return makeToken(user, expiredDate);
	}
	
	// refreshToken 생성
	public String generateRefreshToken(User user) {
		log.info("[generateRefreshToken] 리프레시 토큰을 생성");
		Date now = new Date();
		// 만료 시간 = 현재시각 + 설정한 유지 시간
		Date expiredDate = new Date(now.getTime() + jwtProperties.getRefreshDuration());
		// 생성
		return makeToken(user, expiredDate);
	}
	
	// 토큰 생성 메서드
	public String makeToken(User user, Date expiredDate) {
		String token = Jwts.builder()
				.header().add("typ", "JWT")			// JWT 타입 명시
				.and()
				.issuer(jwtProperties.getIssuer())	// 발행처 정보
				.issuedAt(new Date())				// 발행일시
				.expiration(expiredDate)			// 만료시간
				.subject(user.getEmail())			// 토큰의 주제(Subject) 설정 -> 사용자 이메일
				.claim("id", user.getId())
				.claim("nickname", user.getNickname())
				.claim("name", user.getName())
				.claim("role", user.getRole().name())
				.signWith(getSecretKey(), Jwts.SIG.HS256)	// 비밀키와 해시 알고리즘 사용, 토큰 설명값 설정
				.compact();							// 토큰 정보들을 최종 압축, 문자열로 반환
			log.info("[make]");
			return token;
	}
	
	// 비밀키 생성 메서드
	private SecretKey getSecretKey() {
		// HMAC 키는 바이트 배열 형식으로 제공
		return Keys.hmacShaKeyFor(jwtProperties.getSecretKey().getBytes());
	}
	
	// 유효한 토큰인지
	public boolean validateToken(String token) {
		log.info("[validateToken] 토큰 검증 시작 {}", token);
		try {
			Jwts.parser()
				.verifyWith(getSecretKey())			// 비밀키로 서명 검증
				.build()
				.parseSignedClaims(token);			// 서명된 클레임 파싱
			log.info("[validateToken] 토큰 검증 통과");
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		log.info("[validateToken] 토큰 검증 실패");
		return false;
	}
	
	// claim(정보) 추출
	private Claims getClaims(String token) {
		return Jwts.parser()
				.verifyWith(getSecretKey())			// 비밀키로 서명 검증
				.build()
				.parseSignedClaims(token)			// 서명된 클레임 파싱
				.getPayload();
	}
	
	// 토큰에서 사용자 이메일 추출
	public String getUserEmailByToken(String token) {
		log.info("[getUserEmailByToken] 토큰에서 회원 정보 추출");
		Claims claims = getClaims(token);
		// claim에서 Email 추출
		String email = claims.get("sub", String.class);
		return email;
	}
	
	// 토큰 인증 정보를 반환
	public Authentication getAuthenticationByToken(String token) {
		log.info("[getAuthenticationByToken] 토큰 인증 정보 조회");
		// 이메일 get
		String userEmail = getUserEmailByToken(token);
		// 유저 get
		User user = (User) userDetailsService.loadUserByUsername(userEmail);
		// 사용자 정보와 권한을 포함한 Authentication 객체 생성
		Authentication authentication = new UsernamePasswordAuthenticationToken(user, token, user.getAuthorities());
		return authentication;
	}
	
}
















