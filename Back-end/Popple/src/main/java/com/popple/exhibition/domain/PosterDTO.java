package com.popple.exhibition.domain;

import com.popple.exhibition.entity.Poster;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class PosterDTO {
	private Long id;
	private String name, savedName, kbSize;
	private Long size;
	
	public static PosterDTO toDTO(Poster poster) {
		if (poster == null) return null;
		return PosterDTO.builder()
				.id(poster.getId())
				.name(poster.getPosterName())
				.savedName(poster.getSavedName())
				.kbSize(((Double) (poster.getFileSize() / 1024.0)).toString())
				.build();
	}
}
