package com.popple.auth.domain.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserEditRequest {
	private String password;
	private String nickname;
}
