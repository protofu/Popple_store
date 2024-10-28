package com.popple.event.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.popple.event.entity.EventImage;

@Repository
public interface EventImageRepository extends JpaRepository<EventImage, Long> {
	
}
