package com.popple.event.domain;

import com.popple.event.entity.EventImage;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class EventImageDTO {
	private Long id;
	private String name, savedName, kbSize;
	private boolean isMain;
	private Long size;
	
	public static EventImageDTO toDTO(EventImage eventImage) {
		if (eventImage == null) return null;
		return EventImageDTO.builder()
				.id(eventImage.getId())
				.name(eventImage.getImage())
				.savedName(eventImage.getSavedName())
				.kbSize(((Double)(eventImage.getFileSize() / 1024.0)).toString())
				.isMain(eventImage.isMain())
				.build();
	}
}
