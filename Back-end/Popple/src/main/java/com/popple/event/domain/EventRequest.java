package com.popple.event.domain;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventRequest {
	private Long exId; 
	private String eventName;
	private String summary;
	private String description;
	private LocalDate startAt;
	private LocalDate endAt;
}
