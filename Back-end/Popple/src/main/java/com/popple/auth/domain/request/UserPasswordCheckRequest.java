package com.popple.auth.domain.request;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class UserPasswordCheckRequest {
	private String password;
}
