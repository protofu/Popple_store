package com.popple.exhibition.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@Tag(name = "팝업/전시	", description = "팝업/전시 관련 API")
@RequestMapping("")
public class ExhibitionController {
//	private final ExhibitonService popUpService;
//	
//	@Operation(summary = "팝업/전시 추가", description = "팝업/전시를 생성합니다.")
//	@PostMapping("")
//	public ResponseEntity<ExhibitionResponse> createPopUp(ExhibitionRequest popUpRequest, @AuthenticationPrincipal User user){
//		ExhibitionResponse exhibition = popUpService.createExhibition(popUpRequest, user);
//		return ResponseEntity.status(HttpStatus.CREATED).body(exhibition);
//	}
//	@Operation(summary = "팝업/전시 수정", description = "특정 팝업/전시를 수정합니다.")
//	@PatchMapping("")
//	public ResponseEntity<ExhibitionResponse> updatePopUp(ExhibitionRequest popUpRequest, @AuthenticationPrincipal User user){
//		ExhibitionResponse exhibition = popUpService.updateExhibition(popUpRequest, user);
//		return ResponseEntity.ok(exhibition);
//	}
//	
//	@Operation(summary = "팝업/전시 삭제", description = "특정 팝업/전시를 삭제합니다.")
//	@PatchMapping("")
//	public ResponseEntity<ExhibitionResponse> deletePopUp(Long id, @AuthenticationPrincipal User user){
//		ExhibitionResponse exhibition = popUpService.deleteExhibition(id, user);
//		return ResponseEntity.ok(exhibition);
//	}
//	
//	
//	@Operation(summary = "팝업/전시 목록", description = "팝업/전시 목록을 반환합니다.")
//	@GetMapping("")
//	public ResponseEntity<List<ExhibitionResponse>> getAllPopUp(){
//		List<ExhibitionResponse> exhibitionList = popUpService.getAllExhibition();
//		return ResponseEntity.ok(exhibitionList);
//	}
	
	
	
}
