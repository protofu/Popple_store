package com.popple.review.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.popple.auth.entity.User;
import com.popple.exhibition.service.ExhibitionService;
import com.popple.review.domain.ReviewRequest;
import com.popple.review.domain.ReviewResponse;
import com.popple.review.service.ReviewImageService;
import com.popple.review.service.ReviewService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
@Tag(name = "Review", description = "리뷰 관련 API")
@RequestMapping("/api/review")
public class ReviewController {
	private final ReviewService reviewService;
	private final ExhibitionService exhibitionService;
	private final ReviewImageService imageService;
	
	// location 정보 가져오기
	@Value("${spring.upload.review_location}")
	private String uploadPath;
	
	// 리뷰작성
	@Operation(summary = "리뷰작성", description = "리뷰를 작성합니다.")
	@PostMapping("")
	public ResponseEntity<ReviewResponse> writeReview(@ModelAttribute ReviewRequest req, @RequestParam(name="image", required = false) MultipartFile file, @AuthenticationPrincipal User user){
		log.info("[Review] 리뷰 생성 : {}", req);
		log.info("현재 유저: {}", user);
		log.info("이미지 정보: {}", file);
		ReviewResponse savedReview = reviewService.writeReview(req.getContent(), req.getExhibitionId(), file, user);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedReview);
	}
	
	// 리뷰 조회
	@Operation(summary = "특정 팝업 리뷰 목록 조회", description = "특정 팝업의 리뷰 목록을 조회합니다.")
	@GetMapping("/{id}")
	public ResponseEntity<List<ReviewResponse>> exReviewList(@PathVariable("id") Long exId) {
		log.info("[Review] 리뷰 조회 : {}", exId);
		List<ReviewResponse> reviewList = reviewService.getExhibitionReviewList(exId);
		return ResponseEntity.ok().body(reviewList);
	}
	
	// 내가 쓴 리뷰 목록 조회
	@Operation(summary = "내 리뷰 목록 조회", description = "자신의 리뷰 목록을 조회합니다.")
	@GetMapping("/my")
	public ResponseEntity<List<ReviewResponse>> myReviewList(@AuthenticationPrincipal User user) {
		log.info("[Review] 리뷰 조회 : {}", user.getId());
		List<ReviewResponse> reviewList = reviewService.getMyReviewList(user.getId());
		return ResponseEntity.ok().body(reviewList);
	}
		
	// 리뷰 삭제
	@Operation(summary = "리뷰 삭제", description = "리뷰를 삭제합니다.")
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteReview(@PathVariable("id") Long id, @AuthenticationPrincipal User user) {
		log.info("[Review] 리뷰 삭제 : {}", id);
		ReviewResponse res = reviewService.deleteReview(id, user);
		if (res == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("자신의 리뷰만 삭제 가능 합니다.");
		}
		return ResponseEntity.ok().body(res);
	}
	
	// 리뷰 수정
}
