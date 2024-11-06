package com.popple.reservation.domain;

import java.time.LocalDate;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ReservationRequest {
	private Long exhibitionId;
	private String reservationLink;
	private LocalDate reservationDate;
	
	
}
