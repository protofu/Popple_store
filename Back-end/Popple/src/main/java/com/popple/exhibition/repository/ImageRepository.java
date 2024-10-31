package com.popple.exhibition.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.popple.exhibition.entity.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
	@Query(value = "SELECT p.saved_name FROM Image p WHERE p.exhibition_id = :exhibitionId LIMIT 1", nativeQuery = true)
	Optional<String> findFirstByExhibition(@Param("exhibitionId") Long exhibitionId);

}
