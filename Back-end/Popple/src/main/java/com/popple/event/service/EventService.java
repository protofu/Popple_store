package com.popple.event.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.popple.event.domain.EventRequest;
import com.popple.event.domain.EventResponse;
import com.popple.event.entity.Event;
import com.popple.event.entity.EventImage;
import com.popple.event.entity.EventPoster;
import com.popple.event.respository.EventRepository;
import com.popple.exhibition.entity.Exhibition;
import com.popple.exhibition.repository.ExhibitionRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class EventService {
	private final EventRepository eventRepo;
	private final ExhibitionRepository exhibitionRepository;
	private final EventImageService eventImageService;
	private final EventPosterService eventPosterService;

	public EventResponse addEvent(EventRequest req, List<MultipartFile> images, MultipartFile poster) {
		System.out.println(req.getExId());
		// 해당 전시/팝업 조회
		Optional<Exhibition> optExhitibition = exhibitionRepository.findById(req.getExId());
		Exhibition exhibition = optExhitibition.orElseThrow(() -> new IllegalArgumentException("해당되는 전시 또는 팝업이 없습니다."));
				
		// 이벤트 객체 생성
		Event event = Event.builder()
				.eventName(req.getEventName())
				.description(req.getDescription())
				.summary(req.getSummary())
				.startAt(req.getStartAt())
				.endAt(req.getEndAt())
				.exhibition(exhibition)
				.build();
		
		//이미지 객체를 DB에 저장
		eventRepo.save(event);
		
		// 이미지 저장
		List<EventImage> savedImages = images.stream().map(image -> eventImageService.saveImage(image, event)).collect(Collectors.toList());
		// 포스터 저장
		EventPoster savedPoster = eventPosterService.savePoster(poster, event);
		
		EventResponse res = EventResponse.toEntity(event);
		return res;
	}
}
