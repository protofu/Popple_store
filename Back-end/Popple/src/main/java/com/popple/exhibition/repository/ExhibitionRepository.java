package com.popple.exhibition.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.popple.auth.entity.User;
import com.popple.exhibition.entity.Exhibition;
import com.popple.type.ExhiType;

@Repository
public interface ExhibitionRepository extends JpaRepository<Exhibition, Long> {

	List<Exhibition> findAllByUser(User user);
	
	@Query("SELECT e FROM Exhibition e WHERE (e.exhibitionName LIKE %:keyword% OR e.address LIKE %:keyword%) AND e.endAt >= :today")
	List<Exhibition> findByKeywordAndEndAtAfter(@Param("keyword") String keyword, @Param("today") LocalDate today);

    @Query("SELECT e FROM Exhibition e WHERE (e.exhibitionName LIKE %:keyword% OR e.address LIKE %:keyword%) AND e.type.id = :typeId AND e.endAt >= :today")
	List<Exhibition> findByKeywordAndTypeIdAndEndAtAfter(@Param("keyword") String keyword, @Param("typeId") Long typeId, @Param("today") LocalDate today);

    List<Exhibition> findByEndAtAfter(LocalDate today);

    List<Exhibition> findByEndAtAfterAndType(LocalDate today, ExhiType type);
}
