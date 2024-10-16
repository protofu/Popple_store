package com.popple.eventposter.entity;

import com.popple.event.entity.Event;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor		
public class EventPoster {
	//id
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(updatable = false)
	private Long id;
		
	//이벤트 id
	@JoinColumn(name = "event_id", nullable = false)
	@ManyToOne
	private Event event;
		
	//이벤트 포스터
	@Column(nullable = true)
	private String poster;
}
