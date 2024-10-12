package com.popple.auth.domain;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class LoginRequest {
	private String email;
	private String password;
}
