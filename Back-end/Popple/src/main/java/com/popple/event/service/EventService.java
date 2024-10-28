package com.popple.event.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.popple.event.domain.EventRequest;
import com.popple.event.domain.EventResponse;
import com.popple.event.entity.EventImage;
import com.popple.event.entity.EventPoster;
import com.popple.event.respository.EventRepository;
import com.popple.exhibition.entity.Exhibition;
import com.popple.exhibition.entity.Image;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class EventService {
	private final EventRepository eventRepo;
	private final EventImageService eventImageService;
	private final EventPosterService eventPosterService;

	public EventResponse addEvent(EventRequest req, List<MultipartFile> images, MultipartFile poster,
			Exhibition exhibition) {
		List<EventImage> savedImage = images.stream().map(image -> eventImageService.saveImage(image)).collect(Collectors.toList());
		EventPoster savedPoster = eventPosterService.savePoster(poster);
		return null;
	}
}
