package com.popple.event.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.popple.event.entity.Event;
import com.popple.event.entity.EventImage;
import com.popple.event.respository.EventImageRepository;
import com.popple.event.utils.EventImageUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class EventImageService {
	private final EventImageRepository eventImageRepository;
	private final EventImageUtils evnetImageUtils;

	public EventImage saveImage(MultipartFile image, Event event) {
		if (image != null) {
			EventImage imageFile = evnetImageUtils.eventImageUpload(image);
			if (imageFile != null) {
				imageFile.setEvent(event);
				EventImage savedImageFile = eventImageRepository.save(imageFile);
				return savedImageFile;
			}
		}
		return null;
	}
	
}
