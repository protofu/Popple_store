package com.popple.company.domain;

import com.popple.company.entity.Company;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CompanyResponse {
	private String buisinessNumber;
	private String sector;
	private String name;
	private String address;
	private String tel;
	private String leader;
	
	private String email;
	

	public static CompanyResponse toDTO(Company company) {
		return CompanyResponse.builder()
				.buisinessNumber(company.getBuisinessNumber())
				.sector(company.getSector())
				.address(company.getAddress())
				.name(company.getName())
				.tel(company.getTel())
				.leader(company.getLeader())
				.build();
	}
	
}
