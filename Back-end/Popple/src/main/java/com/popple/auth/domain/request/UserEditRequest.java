package com.popple.auth.domain.request;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class UserEditRequest {
	private String password;
	private String nickname;
}
