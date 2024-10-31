package com.popple.reservation.domain;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReservationResponse {
	private Long id,exhibitionId;
	private String exhibitionName, reserver, address;
	private LocalDate reservationDate;

}	
