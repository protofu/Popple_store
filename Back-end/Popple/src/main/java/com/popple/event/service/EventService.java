package com.popple.event.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.popple.event.domain.EventRequest;
import com.popple.event.domain.EventResponse;
import com.popple.event.respository.EventRepository;
import com.popple.exhibition.entity.Exhibition;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class EventService {
	private final EventRepository eventRepo;

	public EventResponse addEvent(EventRequest req, List<MultipartFile> images, MultipartFile poster,
			Exhibition exhibition) {
		List<images> savedImage = images.stream().map(i -> image) 
		return null;
	}
}
