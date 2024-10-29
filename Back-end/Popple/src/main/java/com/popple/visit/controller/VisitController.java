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
import com.popple.visit.domain.StatsResponse;
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
	public ResponseEntity<StatsResponse> weekStatistic(@PathVariable("id") Long exId) {
		StatsResponse wRes = visitService.getWeekStatistic(exId, false);
		return ResponseEntity.ok(wRes);
	}
	
	// 성별 기준 방문 통계
	@Operation(summary = "팝업/전시 성별 통계", description = "팝업/전시 기준 성별 통계를 반환합니다.")
	@GetMapping("/gender/{id}")
	public ResponseEntity<StatsResponse> genderStatistic(@PathVariable("id") Long exId) {
		StatsResponse gRes = visitService.getGenderStatistic(exId, false);
		return ResponseEntity.ok(gRes);
	}
	
	// 나이별 기준 방문 통계
	@Operation(summary = "팝업/전시 나이별 통계", description = "팝업/전시 기준 나이별 통계를 반환합니다.")
	@GetMapping("/age/{id}")
	public ResponseEntity<StatsResponse> ageStatistic(@PathVariable("id") Long exId) {
		StatsResponse aRes = visitService.getAgeStatistic(exId, false);
		return ResponseEntity.ok(aRes);
	}
	
	// 시간대별 기준 방문 통계
	@Operation(summary = "팝업/전시 시간대별 통계", description = "팝업/전시 기준 시간대별 통계를 반환합니다.")
	@GetMapping("/time/{id}")
	public ResponseEntity<StatsResponse> timeStatistic(@PathVariable("id") Long exId) {
		StatsResponse tRes = visitService.getTimeStatistic(exId, false);
		return ResponseEntity.ok(tRes);
	}
	
	
	// 기업 기준
	
	// [기업] 요일 기준 방문 통계
	@Operation(summary = "기업 요일 통계", description = "기업 기준 요일 통계를 반환합니다.")
	@GetMapping("/week-comp/{id}")
	public ResponseEntity<StatsResponse> weekCompStatistic(@PathVariable("id") Long exId) {
		StatsResponse wRes = visitService.getWeekStatistic(exId, true);
		return ResponseEntity.ok(wRes);
	}
	
	// [기업] 성별 기준 방문 통계
	@Operation(summary = "기업 성별 통계", description = "기업 기준 성별 통계를 반환합니다.")
	@GetMapping("/gender-comp/{id}")
	public ResponseEntity<StatsResponse> genderCompStatistic(@PathVariable("id") Long exId) {
		StatsResponse gRes = visitService.getGenderStatistic(exId, true);
		return ResponseEntity.ok(gRes);
	}
	
	// [기업] 나이별 기준 방문 통계
	@Operation(summary = "기업 나이별 통계", description = "기업 기준 나이별 통계를 반환합니다.")
	@GetMapping("/age-comp/{id}")
	public ResponseEntity<StatsResponse> ageCompStatistic(@PathVariable("id") Long exId) {
		StatsResponse aRes = visitService.getAgeStatistic(exId, true);
		return ResponseEntity.ok(aRes);
	}
	
	// [기업] 시간대별 기준 방문 통계
	@Operation(summary = "기업 시간대별 통계", description = "기업 기준 시간대별 통계를 반환합니다.")
	@GetMapping("/time-comp/{id}")
	public ResponseEntity<StatsResponse> timeCompStatistic(@PathVariable("id") Long exId) {
		StatsResponse tRes = visitService.getTimeStatistic(exId, true);
		return ResponseEntity.ok(tRes);
	}
}
