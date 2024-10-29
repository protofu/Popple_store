package com.popple.visit.domain;

import java.util.Map;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StatsResponse {
	private Map<String, Integer> stats;
}
