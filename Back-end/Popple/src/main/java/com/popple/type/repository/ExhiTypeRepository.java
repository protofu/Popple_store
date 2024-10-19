package com.popple.type.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.popple.type.ExhiType;

@Repository
public interface ExhiTypeRepository extends JpaRepository<ExhiType, Long> {

}
