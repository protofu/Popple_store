package com.popple.reservation.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.popple.auth.entity.User;
import com.popple.exhibition.entity.Exhibition;
import com.popple.exhibition.repository.ExhibitionRepository;
import com.popple.reservation.domain.ReservationRequest;
import com.popple.reservation.domain.ReservationResponse;
import com.popple.reservation.domain.ReserverResponse;
import com.popple.reservation.entity.Reservation;
import com.popple.reservation.repository.ReservationRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ReservationService {
	private final ReservationRepository reservationRepository;
	private final ExhibitionRepository exhibitionRepository;
	
	// 예약
	public ReservationResponse reserve(ReservationRequest request, User user) {
		Exhibition exhibition = exhibitionRepository.findById(request.getExhibitionId()).orElseThrow(() -> new IllegalArgumentException("해당 팝업이 유효하지 않습니다."));
		Reservation reservation = new Reservation();
		reservation.setUser(user);
		reservation.setExhibition(exhibition);
		reservation.setReservationDate(request.getReservationDate());
		
		reservationRepository.save(reservation);
		
		return ReservationResponse.builder()
				.id(reservation.getId())
				.reserver(user.getName())
				.exhibitionName(exhibition.getExhibitionName())
				.reservationDate(reservation.getReservationDate())
				.build();
	}

	// 자신이 예약한 리스트
	public List<ReservationResponse> getAllReserve(User user) {
		List<Reservation> reserveList = reservationRepository.findByUser(user);
		List<ReservationResponse> resList = reserveList.stream().map(reserve -> ReservationResponse.builder()
				.id(reserve.getId())
				.exhibitionName(reserve.getExhibition().getExhibitionName())
				.reserver(reserve.getUser().getName())
		        .reservationDate(reserve.getReservationDate())
				.build())
			.collect(Collectors.toList());
		return resList;
	}

	// 특정 팝업/전시에 대한 예약자 리스트
	public List<ReserverResponse> getReserveList(Long id) {
		Exhibition exhibition = exhibitionRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("유효하지 않은 팝업/전시 입니다."));
		List<Reservation> reserverList = reservationRepository.findByExhibition(exhibition);
		return reserverList.stream()
				.filter(reservation -> reservation.getDeletedAt()==null) // 예약취소 안된 것(deletedAt)
				.map(reservation -> ReserverResponse.builder()
				.id(reservation.getId())
				.reserverName(reservation.getUser().getName())
				.reserveTime(reservation.getReservationDate())
				.isAttend(reservation.isAttend())
				.build()).collect(Collectors.toList());
	}

	// 예약 취소
	public ReservationResponse cancelReserve(Long exId, User user) {
		Reservation reservation = reservationRepository.findById(exId).orElseThrow(() -> new IllegalArgumentException("해당 팝업/전시가 존재하지 않습니다."));
		if (!user.getId().equals(reservation.getUser().getId())) {
			throw new IllegalArgumentException("예약자 본인만 취소 가능합니다.");
		}
		reservation.setDeletedAt(LocalDateTime.now());
		Reservation savedReservation = reservationRepository.save(reservation);
		return ReservationResponse.builder()
				.id(savedReservation.getId())
				.exhibitionName(savedReservation.getExhibition().getExhibitionName())
				.reserver(savedReservation.getUser().getName())
				.reservationDate(savedReservation.getReservationDate())
				.build();
	}

	// 방문 확인
	public ReserverResponse checkReserver(Long exId, User user) {
		Exhibition exhibition = exhibitionRepository.findById(exId).orElseThrow(() -> new IllegalArgumentException("잘못된 팝업/전시 입니다."));
		Reservation reservation = reservationRepository.findByExhibitionAndUser(exhibition, user).orElseThrow(() -> new IllegalArgumentException("잘못된 예약입니다."));
		if (!reservation.getUser().getId().equals(user.getId()) ) {
			return null;
		}
		reservation.setAttend(true);
		Reservation savedReservation = reservationRepository.save(reservation);
		
		return ReserverResponse.builder()
				.id(savedReservation.getId())
				.reserverName(savedReservation.getExhibition().getExhibitionName())
				.reserveTime(savedReservation.getReservationDate())
				.isAttend(savedReservation.isAttend())
				.build();
	}
	

}

