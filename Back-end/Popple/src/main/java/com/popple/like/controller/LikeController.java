package com.popple.like.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.popple.auth.entity.User;
import com.popple.like.domain.LikeResponse;
import com.popple.like.service.LikeService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@Tag(name = "좋아요(찜)", description = "좋아요(찜) 관련 API")
@RequestMapping("/api/like")
public class LikeController {
	private final LikeService likeService;
	
    // Like 목록 조회
    @Operation(summary = "내가 좋아요한 목록 조회", description = "자신이 좋아요한 목록을 조회합니다.")
    @GetMapping("")
    public ResponseEntity<List<LikeResponse>> getMyLikeList(@AuthenticationPrincipal User user) {
    	List<LikeResponse> myLikeList = likeService.getMyLikeList(user);
        return ResponseEntity.ok(myLikeList);
    }
    
    // Like post
    @Operation(summary = "좋아요", description = "좋아요 합니다.")
    @PostMapping("/{id}")
    public ResponseEntity<LikeResponse> pressLike(@PathVariable("id") Long exId, @AuthenticationPrincipal User user) {
    	LikeResponse likeRes = likeService.pressLike(exId, user);
        return ResponseEntity.ok(likeRes);
    }
    
    // Like post
    @Operation(summary = "좋아요 취소", description = "좋아요를 취소 합니다.")
    @DeleteMapping("/{id}")
    public ResponseEntity<LikeResponse> unlike(@PathVariable("id") Long exId, @AuthenticationPrincipal User user) {
    	LikeResponse likeRes = likeService.unlike(exId, user);
        return ResponseEntity.ok(likeRes);
    }
    
    // Like 갯수
    @Operation(summary = "좋아요 취소", description = "좋아요를 취소 합니다.")
    @GetMapping("/{id}")
    public ResponseEntity<?> howManyLikes(@PathVariable("id") Long exId) {
    	int likeCount = likeService.getLikesCount(exId);
        return ResponseEntity.ok(likeCount);
    }
}
