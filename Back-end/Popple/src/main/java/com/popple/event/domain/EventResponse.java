package com.popple.event.domain;

import java.time.LocalDate;
import java.util.List;

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
	private String eventPoster;
	private List<String> eventImage;
	
	
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
	
	public static EventResponse toDTO(Event event, String poster, List<String> images) {
		return EventResponse.builder()
				.id(event.getId())
				.description(event.getDescription())
				.eventName(event.getEventName())
				.summary(event.getSummary())
				.startAt(event.getStartAt())
				.endAt(event.getEndAt())
				.exhibition(event.getExhibition())
				.eventPoster(poster)
				.eventImage(images)
				.build(); 
	}
	public static EventResponse toDTO(Event event, String poster) {
		return EventResponse.builder()
				.id(event.getId())
				.description(event.getDescription())
				.eventName(event.getEventName())
				.summary(event.getSummary())
				.startAt(event.getStartAt())
				.endAt(event.getEndAt())
				.exhibition(event.getExhibition())
				.eventPoster(poster)
				.build(); 
	}
}
