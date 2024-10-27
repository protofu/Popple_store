package com.popple.visit.domain;

import java.util.Map;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WeekResponse {
	private Long exId;
	private Map<String, Integer> weekStats;  // 요일별 방문 통계 (ex: {"mon": 10, "tue": 15, ...})
}
