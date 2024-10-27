package com.popple.reservation.domain;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReserverResponse {
	private Long id;
	private String reserverName;
	private LocalDate reserveTime;
	private boolean isAttend;
}
