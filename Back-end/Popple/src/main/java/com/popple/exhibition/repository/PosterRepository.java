package com.popple.exhibition.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.popple.exhibition.entity.Poster;

@Repository
public interface PosterRepository extends JpaRepository<Poster, Long> {
	@Query(value = "SELECT p.saved_name FROM Poster p WHERE p.exhibition_id = :exhibitionId LIMIT 1", nativeQuery = true)
	Optional<String> findFirstByExhibition(@Param("exhibitionId") Long exhibitionId);

	Optional<Poster> findByExhibitionId(Long exhiId);

}
