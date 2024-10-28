package com.popple.event.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.popple.auth.entity.User;
import com.popple.event.domain.EventRequest;
import com.popple.event.domain.EventResponse;
import com.popple.event.service.EventService;
import com.popple.exhibition.entity.Exhibition;

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
	@PostMapping("/create")
	public ResponseEntity<EventResponse> createEvnet(
			@ModelAttribute EventRequest req,
			@RequestParam(name = "eventImage") List<MultipartFile> images,
			@RequestParam(name = "eventPoster") MultipartFile poster,
			@RequestBody Exhibition exhibition) {
		EventResponse event = eventService.addEvent( req, images, poster, exhibition);
		return ResponseEntity.ok(event);
	}

	

}
