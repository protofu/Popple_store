package com.popple.reservation.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.popple.auth.entity.User;
import com.popple.reservation.domain.ReservationRequest;
import com.popple.reservation.domain.ReservationResponse;
import com.popple.reservation.domain.ReserverResponse;
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
	
	
	// 예약 등록 (예약자에게 QR코드가 이메일로 발송됩니다.)
	@Operation(summary = "예약 등록", description = "예약을 생성합니다.")
	@PostMapping("")
	public ResponseEntity<?> reservation(@RequestBody ReservationRequest request, @AuthenticationPrincipal User user) throws Exception {
		log.info("예약 : {}", request);
		ReservationResponse response = reservationService.reserve(request, user);

		// 예약 완료 시 QR 이메일 발송 로직 추가
		String email = user.getEmail();
		// 예약 고유번호가 있으면 좋겠지만, ID로 대체하여 진행
		String url = request.getReservationLink();
		String title = response.getReserver() + "님의 [" + response.getExhibitionName() + "] 예약 QR코드입니다.";
		boolean qrcode = reservationService.sendQRCode(email, title, url);
		if (qrcode) {
			return ResponseEntity.ok(response);
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("QR코드 전송 실패");
		}
	}
	
	// 자신의 예약 목록
	@Operation(summary = "자신의 예약 목록", description = "자신이 예약한 목록을 조회합니다.")
	@GetMapping("")
	public ResponseEntity<List<ReservationResponse>> getAllReserve(@AuthenticationPrincipal User user) {
		List<ReservationResponse> reserveList = reservationService.getAllReserve(user);
		return ResponseEntity.ok(reserveList);
	}
	
	// 특정 팝업에 대한 예약 목록
	@Operation(summary = "특정 팝업에 대한 예약자 목록", description = "특정 팝업에 대한 예약자 목록을 조회합니다.")
	@GetMapping("/reserver-list/{id}")
	public ResponseEntity<List<ReserverResponse>> exhibitionReserverList(@PathVariable("id") Long id) {
		List<ReserverResponse> reserverList = reservationService.getReserveList(id);
		return ResponseEntity.ok(reserverList);
	}
	
	// 예약 취소
	@Operation(summary = "예약 취소", description = "예약을 취소합니다.")
	@PatchMapping("/cancel/{id}")
	public ResponseEntity<ReservationResponse> cancel(@PathVariable("id") Long exId, @AuthenticationPrincipal User user) {
		ReservationResponse res = reservationService.cancelReserve(exId, user);
		return ResponseEntity.ok(res);
	}
	
	// 방문 확인 (예약자가 방문했을 때, 기업회원이 QR코드를 스캔하여 방문 확인을 처리합니다)
	@Operation(summary = "방문 확인", description = "예약을 확인 처리 합니다.")
	@PatchMapping("/check/{id}")
	public ResponseEntity<?> checkReserver(@PathVariable("id") Long reservationId, @AuthenticationPrincipal User user) {
		if (user == null && user.getAuthorities().isEmpty() && user.getAuthorities().stream().noneMatch(a -> a.getAuthority().equals("ROLE_COMPANY"))) {
			ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
		}
		ReserverResponse res = reservationService.checkReserver(reservationId, user);
		if (res == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 요청");
		}
		return ResponseEntity.ok(res);
	}
	
	// 해당 팝업에 대한 예약이 있는지?
	@Operation(summary = "방문 확인", description = "예약을 확인 처리 합니다.")
	@GetMapping("/check/{id}")
	public ResponseEntity<?> checkMyReservation(@PathVariable("id") Long exId, @AuthenticationPrincipal User user) {
		List<ReserverResponse> res = reservationService.getMyReservationByExId(exId, user);
		return ResponseEntity.ok(res);
	}
}
