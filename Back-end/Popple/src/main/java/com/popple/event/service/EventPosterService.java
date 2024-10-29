package com.popple.event.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.popple.event.entity.Event;
import com.popple.event.entity.EventPoster;
import com.popple.event.respository.EventPosterRepository;
import com.popple.event.utils.EventPosterUtils;
import com.popple.exhibition.entity.Poster;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class EventPosterService {
	private final EventPosterRepository eventPosterRepository;
	private final EventPosterUtils eventPosterUtils;
	
	public EventPoster savePoster(MultipartFile poster, Event event) {
		if (poster != null) {
			EventPoster posterFile = eventPosterUtils.eventPosterUpload(poster);
			if (posterFile != null) {
				posterFile.setEvent(event);
				EventPoster savedPosterFile = eventPosterRepository.save(posterFile);
				return savedPosterFile;
			}
		}
		return null;
	}
	public void deletePoster(Long id) {
		eventPosterRepository.deleteById(id);
	}
	public EventPoster findPoster(Long id) {
		EventPoster poster = eventPosterRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 포스터가 존재하지 않습니다"));
		return poster;
	}
}
