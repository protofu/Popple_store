package com.popple.type.domain;

import com.popple.type.ExhiType;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ExhiTypeResponse {
	private String name;
	
	
	public static ExhiTypeResponse toDTO(ExhiType exhiType) {
		return ExhiTypeResponse.builder().name(exhiType.getName()).build();
	} 
}
