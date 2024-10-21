package com.popple.reservation.domain;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ReservationRequest {
	private Long exhibitionId;
	private LocalDateTime reservationDate;
	
	
}
