package com.popple.auth.domain.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {
	private String accessToken;
}
