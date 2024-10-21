package com.popple.reservation.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.popple.auth.entity.User;
import com.popple.reservation.domain.ReservationRequest;
import com.popple.reservation.domain.ReservationResponse;
import com.popple.reservation.service.ReservationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@Tag(name = "예약", description = "팝업/전시 예약 관련 API")
@RequestMapping("/api/reservation")
public class ReservationController {
	private final ReservationService reservationService;
	
	// 예약 등록
	@Operation(summary = "예약 등록", description = "예약을 생성합니다.")
	@PostMapping("")
	public ResponseEntity<ReservationResponse> reservation(ReservationRequest request, @AuthenticationPrincipal User user) {
		ReservationResponse response = reservationService.reserve(request, user);
		return ResponseEntity.ok(response);
	}
	
	// 자신의 예약 목록
	@Operation(summary = "예약 등록", description = "예약을 생성합니다.")
	@GetMapping("")
	public ResponseEntity<List<ReservationResponse>> getAllReserve(@AuthenticationPrincipal User user) {
		List<ReservationResponse> reserveList = reservationService.getAllReserve(user);
		return ResponseEntity.ok(reserveList);
	}
	
	
	// 특정 팝업에 대한 예약 목록
	
	// 예약 취소
}
