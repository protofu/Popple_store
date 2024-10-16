package com.popple.company.domain;

import java.time.LocalDate;

import com.popple.auth.domain.RoleEnum;
import com.popple.auth.entity.User;
import com.popple.company.entity.Company;

import lombok.Data;

@Data

public class CompanyRequest {
	
	private String buisinessNumber;
	private String sector;
	private String name;
	private String address;
	private String tel;
	private String leader;
	
	private String email;
	private String password;
	
	public Company toEntity() {
		return Company.builder()
				.buisinessNumber(buisinessNumber)
				.sector(sector)
				.name(name)
				.address(address)
				.tel(tel)
				.leader(leader)
				.build();
	}
	
	public User toUserEntity() {
		return User.builder()
				.email(email)
				.password(password)
				.name(leader)
				.nickname(name)
				.birth(LocalDate.now())
				.gender(true)
				.role(RoleEnum.ROLE_COMPANY)
				.build();
	}
}
