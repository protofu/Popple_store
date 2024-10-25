package com.popple.type.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.popple.type.domain.ExhiTypeRequest;
import com.popple.type.domain.ExhiTypeResponse;
import com.popple.type.service.ExhiTypeService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@Tag(name = "팝업/전시	", description = "팝업/전시 타입 API")
@RequestMapping("/api/exhibition-type")
public class ExhiTypeController {
	
	
	private final ExhiTypeService eTservice;
	
	@Operation(summary = "팝업/전시 타입 가져오기", description = "팝업/전시 타입을 가져옵니다.")
	@GetMapping
	public ResponseEntity<ExhiTypeResponse> getExhiTyper(ExhiTypeRequest req){
		ExhiTypeResponse ex = eTservice.getExhiType(req);
		return ResponseEntity.ok(ex);
		
	}
	
}
