package com.popple.like.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.popple.auth.entity.User;
import com.popple.exhibition.entity.Exhibition;
import com.popple.exhibition.repository.ExhibitionRepository;
import com.popple.like.domain.LikeResponse;
import com.popple.like.entity.Like;
import com.popple.like.repository.LikeRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class LikeService {
	private final LikeRepository likeRepository;
	private final ExhibitionRepository exhibitionRepository;
	
	// 나의 좋아요 목록 반환
	public List<LikeResponse> getMyLikeList(User user) {
		List<Like> likeList = likeRepository.findAllByUserId(user.getId());
		List<LikeResponse> res = likeList.stream().map(like -> LikeResponse.builder().exhi(like.getExhibition()).build()).collect(Collectors.toList());
		return res;
	}

	// 좋아요 누르기
	public LikeResponse pressLike(Long exId, User user) {
		Exhibition exhi = exhibitionRepository.findById(exId).orElseThrow(() -> new IllegalArgumentException("해당 팝업/전시가 존재하지 않습니다."));
		Like like = Like.builder()
				.exhibition(exhi)
				.user(user)
				.build();
		likeRepository.save(like);
		
		return LikeResponse.builder()
				.exhi(exhi)
				.build();
	}

	public LikeResponse unlike(Long exId, User user) {
		Like like = likeRepository.findByExhibitionIdAndUserId(exId, user.getId()).orElseThrow(() -> new IllegalArgumentException("이미 취소된 좋아요입니다."));
		likeRepository.delete(like);
		return LikeResponse.builder().exhi(like.getExhibition()).build();
	}

	public int getLikesCount(Long exId) {
		int countLike = likeRepository.countByExhibitionId(exId);
		return countLike;
	}

	// 내가 좋아요 했나?
	public boolean getLikesState(Long exId, User user) {
		Optional<Like> like = likeRepository.findByExhibitionIdAndUserId(exId, user.getId());
		if (like.isPresent()) {
			return true;
		}
		return false;			
	}

}
