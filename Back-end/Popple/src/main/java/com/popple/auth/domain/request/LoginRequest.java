package com.popple.auth.domain.request;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class LoginRequest {
	private String email;
	private String password;
}