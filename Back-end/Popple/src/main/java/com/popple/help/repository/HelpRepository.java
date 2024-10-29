package com.popple.help.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.popple.help.entity.Help;

public interface HelpRepository extends JpaRepository<Help, Long>{

	List<Help> findAllByUserId(Long id);

}
