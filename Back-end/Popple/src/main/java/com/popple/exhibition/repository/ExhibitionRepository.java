package com.popple.exhibition.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.popple.popup.entity.Exhibition;

public interface ExhibitionRepository extends JpaRepository<Exhibition, Long> {

}
