package com.popple.type.domain;

import com.popple.type.ExhiType;

import lombok.Data;

@Data
public class ExhiTypeRequest {
	private Long id;
	private String name;
	
	
	public ExhiType toEntity() {
		return ExhiType.builder().id(id).name(name).build();
		
	}
}	
