package com.popple.like.domain;

import com.popple.exhibition.entity.Exhibition;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LikeResponse {
	private Exhibition exhi;
	private String posterSavedName;
}
