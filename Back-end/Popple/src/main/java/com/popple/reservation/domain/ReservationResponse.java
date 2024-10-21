package com.popple.reservation.domain;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReservationResponse {
	private Long id;
	private String exhibitionName, reserver;
	private LocalDateTime reservationDate;

}	
