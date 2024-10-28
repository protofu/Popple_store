package com.popple.event.domain;

import java.time.LocalDate;

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
}
