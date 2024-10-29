package com.popple.visit.domain;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CheckResponse {
	private Long id;
	private String username;
}
