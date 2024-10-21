package com.popple.reservation.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.popple.auth.entity.User;
import com.popple.exhibition.entity.Exhibition;
import com.popple.exhibition.repository.ExhibitionRepository;
import com.popple.reservation.ReservationRepository;
import com.popple.reservation.domain.ReservationRequest;
import com.popple.reservation.domain.ReservationResponse;
import com.popple.reservation.entity.Reservation;

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
	

}

