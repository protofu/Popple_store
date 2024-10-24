package com.popple.review.domain;

import java.time.LocalDateTime;

import com.popple.review.entity.ReviewImage;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReviewResponse {
	private Long id;
	private Long exhibitionId;
	private String userNickName;
	private String content;
	private ReviewImage image;
	private LocalDateTime createdAt;
}
