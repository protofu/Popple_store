package com.popple.exhibition.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.popple.exhibition.entity.Exhibition;

@Repository
public interface ExhibitionRepository extends JpaRepository<Exhibition, Long> {

}
