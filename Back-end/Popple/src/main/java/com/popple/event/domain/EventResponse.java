package com.popple.event.domain;

import java.time.LocalDate;

import com.popple.event.entity.Event;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EventResponse {
	private String evnetName;
	private String summary;
	private String description;
	private LocalDate startAt;
	private LocalDate endAt;
	
	public static EventResponse toDTO(Event event) {
		return EventResponse.builder()
				.description(event.getDescription())
				.evnetName(event.getEventName())
				.summary(event.getSummary())
				.startAt(event.getStartAt())
				.endAt(event.getEndAt())
				.build();
	}
}
