package com.popple.event.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.popple.event.entity.EventPoster;
import com.popple.event.respository.EventPosterRepository;
import com.popple.event.utils.EventPosterUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class EventPosterService {
	private final EventPosterRepository eventPosterRepository;
	private final EventPosterUtils eventPosterUtils;
	
	public EventPoster savePoster(MultipartFile poster) {
		if (poster != null) {
			EventPoster posterFile = eventPosterUtils.eventPosterUpload(poster);
			if (posterFile != null) {
				EventPoster savedPosterFile = eventPosterRepository.save(posterFile);
				return savedPosterFile;
			}
		}
		return null;
	}
}
