package com.popple.event.domain;

import java.time.LocalDate;

import com.popple.event.entity.Event;
import com.popple.exhibition.entity.Exhibition;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EventResponse {
	private Long id;
	private String eventName; //타이틀
	private String summary; // 슬로건
	private String description; // ?
	private LocalDate startAt; // 시작일
	private LocalDate endAt; // 종료일
	private Exhibition exhibition;
	private String image;
	
	public static EventResponse toDTO(Event event) {
		return EventResponse.builder()
				.id(event.getId())
				.description(event.getDescription())
				.eventName(event.getEventName())
				.summary(event.getSummary())
				.startAt(event.getStartAt())
				.endAt(event.getEndAt())
				.exhibition(event.getExhibition())
				.build();
	}
	
	public static EventResponse toDTO(Event event, String image) {
		return EventResponse.builder()
				.id(event.getId())
				.description(event.getDescription())
				.eventName(event.getEventName())
				.summary(event.getSummary())
				.startAt(event.getStartAt())
				.endAt(event.getEndAt())
				.exhibition(event.getExhibition())
				.image(image)
				.build();
	}
}
