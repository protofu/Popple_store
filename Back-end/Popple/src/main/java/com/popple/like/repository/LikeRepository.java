package com.popple.like.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.popple.like.entity.Like;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {

	List<Like> findAllByUserId(Long id);

	Optional<Like> findByExhibitionIdAndUserId(Long exId, Long id);

	int countByExhibitionId(Long exId);

}
