package com.popple.event.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.popple.event.domain.EventRequest;
import com.popple.event.domain.EventResponse;
import com.popple.event.service.EventService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@Tag(name = "이벤트", description = "이벤트 관련 API")
@RequestMapping("/api/event")
public class EventController {

	private final EventService eventService;

	// 이벤트 등록
	@Operation(summary = "이벤트 추가", description = "이벤트를 생성합니다.")
	@PostMapping("")
	public ResponseEntity<EventResponse> createEvnet(
			@ModelAttribute EventRequest req,
			@RequestParam(name = "eventImage") List<MultipartFile> images,
			@RequestParam(name = "eventPoster") MultipartFile poster) {
		log.info("이벤트 추가 : {}", req);
		EventResponse event = eventService.addEvent(req, images, poster);
		return ResponseEntity.status(HttpStatus.CREATED).body(event);
	}
	
	// 이벤트 목록 조회
	@Operation(summary = "이벤트 목록 조회", description = "이벤트 목록을 조회합니다.")
	@GetMapping("")
	public ResponseEntity<List<EventResponse>> getAllEvent(){
		List<EventResponse> eventList = eventService.getAllEvent();
		return ResponseEntity.ok(eventList);
	}
		
	// 특정 이벤트 조회
	@Operation(summary = "이벤트 상세 조회", description = "특정 이벤트를 조회합니다.")
	@GetMapping("/{id}")
	public ResponseEntity<EventResponse> getEvent(Long id){
		EventResponse event = eventService.getEvent(id);
		return ResponseEntity.ok(event);				
		
	}

	

}
