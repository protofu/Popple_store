package com.popple.review.domain;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class ReviewRequest {
	private String content;
	private Long exhibitionId;
}
