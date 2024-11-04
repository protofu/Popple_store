package com.popple.auth.domain.response;

import java.time.LocalDate;

import com.popple.auth.entity.User;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SignUpResponse {
	private Long id;
	private String email;
	private String nickname;
	private String name;
	private LocalDate birth;
	private boolean gender;
	
	public static SignUpResponse toDTO(User user) {
		return SignUpResponse.builder()
				.id(user.getId())
				.email(user.getEmail())
				.name(user.getName())
				.gender(user.isGender())
				.nickname(user.getNickname())
				.birth(user.getBirth())
				.gender(user.isGender())
				.build();
	}
}
