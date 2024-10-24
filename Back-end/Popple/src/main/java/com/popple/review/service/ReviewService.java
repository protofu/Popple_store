package com.popple.review.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.popple.auth.entity.User;
import com.popple.exhibition.entity.Exhibition;
import com.popple.exhibition.repository.ExhibitionRepository;
import com.popple.review.domain.ReviewResponse;
import com.popple.review.entity.Review;
import com.popple.review.entity.ReviewImage;
import com.popple.review.repository.ReviewRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ReviewService {
	private final ReviewRepository reviewRepository;
	private final ExhibitionRepository exhibitionRepository;
	private final ReviewImageService imageService;
	
	// 리뷰 작성 서비스
	public ReviewResponse writeReview(String content, Long exhibitionId, MultipartFile file, User user) {
		log.info("이미지 저장");
		// 이미지뽑아서 저장
		ReviewImage savedImage = imageService.saveImage(file);
		Review review = new Review();
		// 문제없다면 이미지 셋
		if (savedImage != null) {
			review.setReviewImage(savedImage);
		}
		log.info("팝업 저장 : {}", exhibitionId);
		Exhibition exhibition = exhibitionRepository.findById(exhibitionId).orElseThrow(() -> new IllegalArgumentException("해당 전시가 없습니다."));
		// 유저, 내용 셋
		review.setUser(user);
		review.setContent(content);
		review.setExhibition(exhibition);
		log.info("리뷰 저장");
		// 리뷰 저장
		Review savedReview = reviewRepository.save(review);
		
		return ReviewResponse.builder()
				.id(savedReview.getId())
				.exhibitionId(exhibition.getId())
				.userNickName(savedReview.getUser().getNickname())
				.content(savedReview.getContent())
				.image(savedReview.getReviewImage())
				.createdAt(savedReview.getCreatedAt())
				.build();
	}
	
	// 팝업의 리뷰 리스트 불러오기
	public List<ReviewResponse> getExhibitionReviewList(Long exId) {
		List<Review> reviews = reviewRepository.findAllByExhibitionIdOrderByCreatedAtDesc(exId);
		
		List<ReviewResponse> reviewRes = reviews.stream()
	            .map(this::entityToResponse)
	            .collect(Collectors.toList());

		return reviewRes;
	}

	
	
	
	private ReviewResponse entityToResponse(Review review) {
		return ReviewResponse.builder()
				.id(review.getId())
				.userNickName(review.getUser().getNickname())
				.exhibitionId(review.getExhibition().getId())
				.content(review.getContent())
				.createdAt(review.getCreatedAt())
				.image(review.getReviewImage())
				.build();
				
	}
}
