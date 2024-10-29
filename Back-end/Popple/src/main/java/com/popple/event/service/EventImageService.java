package com.popple.event.service;

import java.util.List;

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
	private final EventImageUtils eventImageUtils;

	public EventImage saveImage(MultipartFile image, Event event) {
		if (image != null) {
			EventImage imageFile = eventImageUtils.eventImageUpload(image);
			if (imageFile != null) {
				imageFile.setEvent(event);
				EventImage savedImageFile = eventImageRepository.save(imageFile);
				return savedImageFile;
			}
		}
		return null;
	}
	public void deleteImage(Long id) {
		eventImageRepository.deleteById(id);
	}
	public List<EventImage> findAll() {
		List<EventImage> imageList = eventImageRepository.findAll();
		return imageList;
	}
	
}
