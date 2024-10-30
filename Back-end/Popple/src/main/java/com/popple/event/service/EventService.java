package com.popple.event.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.popple.auth.entity.User;
import com.popple.event.domain.EventRequest;
import com.popple.event.domain.EventResponse;
import com.popple.event.entity.Event;
import com.popple.event.entity.EventImage;
import com.popple.event.entity.EventPoster;
import com.popple.event.respository.EventPosterRepository;
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
	private final EventPosterRepository eventPosterRepo;
	private final EventImageService eventImageService;
	private final EventPosterService eventPosterService;

	public EventResponse addEvent(EventRequest req, List<MultipartFile> images, MultipartFile poster) {
		System.out.println(req.getExId());
		// 해당 전시/팝업 조회
		Optional<Exhibition> optExhitibition = exhibitionRepository.findById(req.getExId());
		Exhibition exhibition = optExhitibition.orElseThrow(() -> new IllegalArgumentException("해당되는 전시 또는 팝업이 없습니다."));

		// 이벤트 객체 생성
		Event event = Event.builder().eventName(req.getEventName()).description(req.getDescription())
				.summary(req.getSummary()).startAt(req.getStartAt()).endAt(req.getEndAt()).exhibition(exhibition)
				.build();

		// 이미지 객체를 DB에 저장
		eventRepo.save(event);

		// 이미지 저장
		images.stream().map(image -> eventImageService.saveImage(image, event))
				.collect(Collectors.toList());
		// 포스터 저장
		eventPosterService.savePoster(poster, event);

		EventResponse res = EventResponse.toDTO(event);
		return res;
	}

	// 이벤트 전체 조회
	public List<EventResponse> getAllEvent() {
		List<Event> eventList = eventRepo.findAll();// 모든 이벤트
		// pList 반환
//		return pList.stream().map(EventResponse::toDTO).toList();
		return eventList.stream().filter(e -> !e.getEndAt().isBefore(LocalDate.now())).map(e -> {
			EventPoster eventPoster = eventPosterRepo.findOneByEvent(e);
			return EventResponse.toDTO(e, eventPoster.getSavedName());
		}).toList();
	}

	// 이벤트 상세 조회
	public EventResponse getEvent(Long id) {
		Event event = eventRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 이벤트가 존재하지 않습니다"));
		EventResponse res = EventResponse.toDTO(event);
		return res;
	}

	// 이벤트 삭제
	public void deleteEvent(Long id, User user) {
		Event event = eventRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 이벤트가 존재하지 않습니다"));
		List<EventImage> prevImage = eventImageService.findAll();
		EventPoster prevPoster = eventPosterService.findPoster(id);
		if (event.getExhibition().getUser().getId() == user.getId()) {
			if (prevImage != null) {
				prevImage.forEach(i -> eventImageService.deleteImage(i.getId()));
			}
			if (prevPoster != null) {
				eventPosterService.deletePoster(prevPoster.getId());

				eventRepo.deleteById(event.getId());
			}
			
		}return;
	}

	// 이벤트 수정
	public EventResponse updateEvent(User user, List<MultipartFile> images, MultipartFile poster, EventRequest req) {
		Event event = eventRepo.findById(req.getExId()).orElseThrow(() -> new IllegalArgumentException("해당 이벤트가 존재하지 않습니다"));
		List<EventImage> prevImage = eventImageService.findAll();
		EventPoster prevPoster = eventPosterService.findPoster(req.getExId());
		if (event.getExhibition().getUser().getId() == user.getId()) {
			
			event.setSummary(req.getSummary());
			event.setDescription(req.getDescription());
			event.setEventName(req.getEventName());
			
			if (images != null) {
				prevImage.forEach(i -> eventImageService.deleteImage(i.getId()));
				images.stream().map(image -> eventImageService.saveImage(image, event))
						.collect(Collectors.toList());
			}
			if (poster != null) {
				eventPosterService.deletePoster(prevPoster.getId());
				eventPosterService.savePoster(poster, event);
			}
		}
		EventResponse res = EventResponse.toDTO(event);
		return res;
	}

	public boolean isMine(Long id, User user) {
		Event event = eventRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 이벤트가 존재하지 않습니다."));
		if(user.getId() == event.getExhibition().getUser().getId()) {
			return true;
		}else {
			return true;
		}
		
	}

}
