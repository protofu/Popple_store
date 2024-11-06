package com.popple.visit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.popple.visit.entity.Visit;

@Repository
public interface VisitRepository extends JpaRepository<Visit, Long>{

	List<Visit> findAllByExhibitionId(Long exId);

	List<Visit> findAllByCompanyId(Long exId);

    boolean existsByExhibitionIdAndUserId(Long exId, Long id);

}
