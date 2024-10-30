package com.popple.oauth.service;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;

import org.springframework.core.ParameterizedTypeReference;
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
import com.popple.auth.domain.OAuthUserInfo;
import com.popple.auth.entity.User;
import com.popple.auth.entity.UserAuth;
import com.popple.auth.repository.UserAuthRepository;
import com.popple.auth.repository.UserRepository;
import com.popple.common.utils.OAuth2Properties;
import com.popple.common.utils.TokenUtils;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class OAuthService {
	private final UserAuthRepository userAuthRepository;
	private final UserRepository userRepository;
	private final OAuth2Properties oAuth2Properties;
	private final TokenUtils tokenUtils;
	
	public OAuthUserInfo oAuthUser(String code, String provider) {
		// code를 통해 provider에서 제공하는 accessToken을 가져오기
		String providedAccessToken = getAccessToken(code, provider);
		log.info("[providedAccessToken] : {}", providedAccessToken);
		// provider에서 제공하는 accessToken으로 사용자 정보를 추출
		JsonNode jsonNode = generateOAuthUser(providedAccessToken, provider);
		
		OAuthUserInfo oAuthUserInfo = getOAuthUserInfo(jsonNode, provider);
		return oAuthUserInfo;

	}
	
	private OAuthUserInfo getOAuthUserInfo(JsonNode oAuthUserNode, String provider) {
		String key = null;
		String email = null;
		String name = null;
		String nickname = null;
		// 남자 true | 여자 false
		boolean gender = false;
		LocalDate birth = null;
		
		log.info(oAuthUserNode.toString());
		// 카카오라면 추가로 email을 받기
		if (provider.equals("kakao")) {
			key = oAuthUserNode.get("id").asText();
			nickname = oAuthUserNode.get("properties").get("nickname").asText();
		} else if (provider.equals("google")) {
			key = oAuthUserNode.get("sub").asText();
			email = oAuthUserNode.get("email").asText();
			name = oAuthUserNode.get("name").asText();
		}
		Optional<UserAuth> userAuth = userAuthRepository.findByAuthKeyAndProvider(key, provider);
		if (userAuth.isPresent()) {
			email = userAuth.get().getUser().getEmail();
			name = userAuth.get().getUser().getName();
			nickname= userAuth.get().getUser().getNickname();
			gender= userAuth.get().getUser().isGender();
			birth= userAuth.get().getUser().getBirth();
		}
		return new OAuthUserInfo(key, email, name, nickname, gender, birth, provider);
	}

	private String getAccessToken(String code, String provider) {
		// 설정 가져오기
		log.info("[getAccessToken] code : {}", code);
		log.info("[getAccessToken] provider : {}", provider);
		OAuth2Properties.Client client = oAuth2Properties.getClients().get(provider);
		// code를 통해 google에서 제공하는 accessToken을 가져온다
		String decodedCode = URLDecoder.decode(code, StandardCharsets.UTF_8);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
		headers.setBasicAuth(client.getClientId(), client.getClientSecret());
		MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
		params.add("client_id", client.getClientId());
		params.add("client_secret", client.getClientSecret());
		params.add("code", decodedCode);
		params.add("grant_type", "authorization_code");
		params.add("redirect_uri", client.getRedirectUri());
		RestTemplate rt = new RestTemplate();
		HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(params, headers);
		ResponseEntity<Map<String, Object>> responseEntity = rt.exchange(client.getTokenUri(), HttpMethod.POST, requestEntity, new ParameterizedTypeReference<Map<String, Object>>() {});
		Map<String, Object> tokenResponse = responseEntity.getBody();
		if (!responseEntity.getStatusCode().is2xxSuccessful() || tokenResponse == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "사용자 정보를 가져올 수 없음");
		}
		return (String) tokenResponse.get("access_token");
	}
	
	private JsonNode generateOAuthUser(String accessToken, String provider) {
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
		
		return jsonNode;
	}

	@Transactional
	public String oAuthSignUpAndLogin(OAuthUserInfo oAuthUserInfo, HttpServletResponse res) {
		Optional<User> existingUser = userRepository.findByEmail(oAuthUserInfo.getEmail());
		Optional<UserAuth> existingUserAuth = userAuthRepository.findByAuthKeyAndProvider(oAuthUserInfo.getKey(), oAuthUserInfo.getProvider());
		
		User user = existingUser.orElse(null);
		if (user == null) {
	        User newUser = new User();
	        newUser.setEmail(oAuthUserInfo.getEmail());
	        newUser.setName(oAuthUserInfo.getName());
	        newUser.setBirth(oAuthUserInfo.getBirth());
	        newUser.setGender(oAuthUserInfo.isGender());
	        newUser.setNickname(oAuthUserInfo.getNickname());
	        user = userRepository.save(newUser);
	    }
		// userAuth에 미존재 시, userAuthRepository에 userAuth 추가
		if (!existingUserAuth.isPresent()) {
	        UserAuth newUserAuth = new UserAuth();
	        newUserAuth.setAuthKey(oAuthUserInfo.getKey());
	        newUserAuth.setProvider(oAuthUserInfo.getProvider());
	        newUserAuth.setUser(user);
	        userAuthRepository.save(newUserAuth);
	    }
		
		Map<String, String> tokenMap = tokenUtils.generateToken(user);

		// DB에 기록(refresh)
		user.setRefreshToken(tokenMap.get("refreshToken"));
		userRepository.save(user);
		// HEADER에 추가(refresh)
		tokenUtils.setRefreshTokenCookie(res, tokenMap.get("refreshToken"));
		// BODY에 추가(access)
		return tokenMap.get("accessToken");
	}
}
