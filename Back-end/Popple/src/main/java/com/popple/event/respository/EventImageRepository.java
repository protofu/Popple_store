package com.popple.event.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.popple.event.entity.Event;
import com.popple.event.entity.EventImage;

@Repository
public interface EventImageRepository extends JpaRepository<EventImage, Long> {

	List<EventImage> findByEvent(Event event);
	
}
