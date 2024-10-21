package com.popple.auth.domain.request;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.popple.auth.domain.RoleEnum;
import com.popple.auth.entity.User;
import com.popple.company.entity.Company;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class SignUpRequest {
	private String email;
	private String nickname;
	private String password;
	private String name;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate birth;
	
	public User toEntity() {
		return User.builder()
				.email(email)
				.name(name)
				.password(password)
				.nickname(nickname)
				.birth(birth)
				.gender(false)
				.role(RoleEnum.ROLE_USER)
				.build();
	}
	

}
