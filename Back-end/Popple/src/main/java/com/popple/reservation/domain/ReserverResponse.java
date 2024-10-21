package com.popple.reservation.domain;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReserverResponse {
	private Long id;
	private String reserverName;
	private LocalDateTime reserveTime;
	private boolean isAttend;
}
