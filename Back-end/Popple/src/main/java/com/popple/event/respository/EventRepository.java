package com.popple.event.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.popple.event.entity.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

}
