package com.popple.visit.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.popple.auth.entity.User;
import com.popple.visit.domain.CheckResponse;
import com.popple.visit.domain.WeekResponse;
import com.popple.visit.service.VisitService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@Tag(name = "방문 통계", description = "방문 통계 관련 API")
@RequestMapping("/api/visit")
public class VisitController {
	private final VisitService visitService;

	
	// 방문 체크
	@Operation(summary = "방문 체크", description = "방문 인증을 합니다.")
	@PostMapping("/{id}")
	public ResponseEntity<CheckResponse> visitCheck(@PathVariable("id") Long exId, @AuthenticationPrincipal User user) {
		CheckResponse res = visitService.insert(exId, user);
		return ResponseEntity.ok(res);
	}
	
	// 팝업/전시 기준
	
	// 요일 기준 방문 통계
	@Operation(summary = "팝업/전시 요일 통계", description = "팝업/전시 기준 요일 통계를 반환합니다.")
	@GetMapping("/week/{id}")
	public ResponseEntity<WeekResponse> weekStatistic(@PathVariable("id") Long exId) {
		WeekResponse wRes = visitService.getWeekStatistic(exId);
		return ResponseEntity.ok(wRes);
	}
	
	// 성별 기준 방문 통계
	@Operation(summary = "팝업/전시 성별 통계", description = "팝업/전시 기준 성별 통계를 반환합니다.")
	@GetMapping("/gender/{id}")
	public ResponseEntity<WeekResponse> genderStatistic(@PathVariable("id") Long exId) {
		WeekResponse wRes = visitService.getWeekStatistic(exId);
		return ResponseEntity.ok(wRes);
	}
	
}
