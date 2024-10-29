package com.popple.review.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.popple.review.entity.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long>{

	List<Review> findAllByExhibitionIdOrderByCreatedAtDesc(Long exId);

	List<Review> findAllByUserId(Long id);

}
