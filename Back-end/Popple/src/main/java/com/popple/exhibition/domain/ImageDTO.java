package com.popple.exhibition.domain;

import com.popple.exhibition.entity.Image;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class ImageDTO {
	private Long id;
	private String name, savedName, kbSize;
	private boolean isMain;
	private Long size;
	
	public static ImageDTO toDTO(Image image) {
		if (image == null) return null;
		return ImageDTO.builder()
				.id(image.getId())
				.name(image.getImageName())
				.savedName(image.getSavedName())
				.kbSize(((Double) (image.getFileSize() / 1024.0)).toString())
				.isMain(image.isMain())
				.build();
	}
}
