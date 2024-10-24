package com.popple.review.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.popple.review.entity.ReviewImage;
import com.popple.review.repository.ReviewImageRepository;
import com.popple.review.util.FileUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ReviewImageService {
	private final ReviewImageRepository reviewImageRepository;
	private final FileUtils fileUtils; 
	
	public ReviewImage saveImage(MultipartFile file) {
		if (file != null) {
			ReviewImage imageFile = fileUtils.fileUpload(file);
			if (imageFile != null) {
				ReviewImage saveReviewImage = reviewImageRepository.save(imageFile);
				return saveReviewImage;
			}
		}
		return null;
	}


}
