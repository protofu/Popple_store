package com.popple.event.domain;

import com.popple.event.entity.EventPoster;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class EventPosterDTO {
	private Long id;
	private String name, savedName, kbSize;
	private Long size;

	public static EventPosterDTO toDTO(EventPoster eventPoster) {
		if (eventPoster == null) return null;
		return EventPosterDTO.builder()
				.id(eventPoster.getId())
				.name(eventPoster.getPosterName())
				.savedName(eventPoster.getSavedName())
				.kbSize(((Double) (eventPoster.getFileSize() / 1024.0)).toString())
				.build();
	}

}
