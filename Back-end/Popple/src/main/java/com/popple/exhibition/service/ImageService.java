package com.popple.exhibition.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.popple.exhibition.domain.ImageDTO;
import com.popple.exhibition.entity.Exhibition;
import com.popple.exhibition.entity.Image;
import com.popple.exhibition.repository.ImageRepository;
import com.popple.exhibition.utils.ImageUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImageService {
	private final ImageRepository imageRepository;
	private final ImageUtils imageUtils;
	
	public Image saveImage(MultipartFile image, Exhibition exhibition) {
		if (image != null) {
			Image imageFile = imageUtils.imageUpload(image);
			if (imageFile != null) {				
				imageFile.setExhibition(exhibition);
				Image savedImageFile = imageRepository.save(imageFile);
				return savedImageFile;
			}
		}
		return null;
	}
	
	public void deleteImage (Long id) {
		imageRepository.deleteById(id);
	}
	
	public ImageDTO getIamgeByImageId(Long id) {
		Image image = imageRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 이미지가 존재하지 않습니다."));
		return ImageDTO.toDTO(image);
	}
}
