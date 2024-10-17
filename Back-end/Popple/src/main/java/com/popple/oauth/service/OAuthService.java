package com.popple.oauth.service;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.databind.JsonNode;
import com.popple.auth.entity.User;
import com.popple.auth.repository.UserRepository;
import com.popple.common.utils.OAuth2Properties;
import com.popple.common.utils.TokenUtils;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class OAuthService {
	private final OAuth2Properties oAuth2Properties;
	private final UserRepository userRepository;
	private final TokenUtils tokenUtils;
	
	public String oAuthSignIn(String code, String provider, HttpServletResponse res) {
		// code를 통해 provider에서 제공하는 accessToken을 가져오기
		log.info("[oAuthSignIn] 여기를 못오나?");
		String providedAccessToken = getAccessToken(code, provider);
		log.info("[providedAccessToken] : {}", providedAccessToken);
		// provider에서 제공하는 accessToken으로 사용자 정보를 추출
		User user = generateOAuthUser(providedAccessToken, provider);
		// 사용자 정보를 조회하고
		// 기존에 있는 사용자라면 (oauth 인증 여부에 따라 oauth = true로 변경)
		// 기존에 없는 사용자라면 (새로 가입 _ DB 추가)
		user = userRepository.findByEmailAndDeletedAtIsNull(user.getEmail()).orElse(user);
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

	private String getAccessToken(String code, String provider) {
		// 설정 가져오기
		log.info("[getAccessToken] code : {}", code);
		log.info("[getAccessToken] provider : {}", provider);
		OAuth2Properties.Client client = oAuth2Properties.getClients().get(provider);
		log.info("[getAccessToken] 1단계 완료");
		// code를 통해 google에서 제공하는 accessToken을 가져온다
		String decodedCode = URLDecoder.decode(code, StandardCharsets.UTF_8);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
		headers.setBasicAuth(client.getClientId(), client.getClientSecret());
		log.info("[getAccessToken] 2단계 완료");
		MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
		params.add("client_id", client.getClientId());
		params.add("client_secret", client.getClientSecret());
		params.add("code", decodedCode);
		params.add("grant_type", "authorization_code");
		params.add("redirect_uri", client.getRedirectUri());
		log.info("[getAccessToken] 3단계 완료");
		RestTemplate rt = new RestTemplate();
		HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(params, headers);
		ResponseEntity<Map> responseEntity = rt.postForEntity(client.getTokenUri(), requestEntity, Map.class);
		
		if (!responseEntity.getStatusCode().is2xxSuccessful() || responseEntity.getBody() == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "사용자 정보를 가져올 수 없음");
		}
		log.info("[getAccessToken] 4단계 완료");
		return (String) responseEntity.getBody().get("access_token");
	}
	
	private User generateOAuthUser(String accessToken, String provider) {
		// 설정 가져오기
		OAuth2Properties.Client client = oAuth2Properties.getClients().get(provider);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", "Bearer " + accessToken);
		
		RestTemplate rt = new RestTemplate();
		ResponseEntity<JsonNode> responseEntity = rt.exchange(client.getUserInfoRequestUri(), HttpMethod.GET, new HttpEntity<>(headers), JsonNode.class);
		
		if (!responseEntity.getStatusCode().is2xxSuccessful() || responseEntity.getBody() == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "사용자 정보를 가져올 수 없음");
		}
		
		JsonNode jsonNode = responseEntity.getBody();
		String email = null;
		String name = null;
		User user = null;
		System.out.println(responseEntity.getBody());
		try {
			if (jsonNode.has("email") && jsonNode.has("name")) {
				email = jsonNode.get("email").asText();
				name = jsonNode.get("name").asText();
				user = User.builder()
					.email(email)
					.name(name)
					.oAuth(true)
					.build();
			} else if (jsonNode.has("id") && jsonNode.has("properties")) {
				// 이부분이 카카오 이메일 받는 부분
				email = jsonNode.get("id").asText() + "@kakao.com";
				name = jsonNode.get("properties").get("nickname").asText();
				user = User.builder()
					.email(email)
					.name(name)
					.oAuth(true)
					.build();
			} else {
				throw new RuntimeException("해당 사용자를 찾을 수 없습니다.");
			}
		} catch (RuntimeException e) {
			throw new RuntimeException("해당 사용자를 찾을 수 없습니다.");
		}
		return user;
	}

}
