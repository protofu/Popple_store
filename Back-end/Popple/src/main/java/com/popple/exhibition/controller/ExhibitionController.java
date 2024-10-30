package com.popple.exhibition.controller;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.popple.auth.entity.User;
import com.popple.exhibition.domain.ExhibitionRequest;
import com.popple.exhibition.domain.ExhibitionResponse;
import com.popple.exhibition.service.ExhibitionService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Data
@AllArgsConstructor
class ResponseMap {
	private String address_name;
	private Double x;
	private Double y;
}


@RestController
@Slf4j
@RequiredArgsConstructor
@Tag(name = "팝업/전시	", description = "팝업/전시 관련 API")
@RequestMapping("/api/exhibition")
public class ExhibitionController {
	private final ExhibitionService exService;
	
	@Value("${spring.upload.image_location}")
	private String imageUploadPath;
	@Value("${spring.upload.poster_location}")
	private String posterUploadPath;
	
	
	// 지도 가져오기
	@GetMapping("/test")
	public ResponseEntity<?> test() {
		List<ResponseMap> result = new ArrayList<ResponseMap>();
		result.add(new ResponseMap("팝업1", 126.986049484352, 37.5717032982693));
		result.add(new ResponseMap("팝업2", 128.074410290631, 35.191363655428));
		result.add(new ResponseMap("팝업3", 128.667385218797, 35.1497547138484));
		
		return ResponseEntity.ok(result);
	}

	// 등록
	@Operation(summary = "팝업/전시 추가", description = "팝업/전시를 생성합니다.")
	@PostMapping("/resist")
	public ResponseEntity<ExhibitionResponse> createPopUp(
			@ModelAttribute ExhibitionRequest req, 
			@RequestParam(name="image") List<MultipartFile> images, 
			@RequestParam(name="poster") List<MultipartFile> posters,  
			@AuthenticationPrincipal User user){
		System.out.println(req);
		ExhibitionResponse exhibition = exService.createExhibition(req, images, posters, user);
		return ResponseEntity.status(HttpStatus.CREATED).body(exhibition);
	}
	
	// 수정
	// @Operation(summary = "팝업/전시 수정", description = "특정 팝업/전시를 수정합니다.")
	// @PatchMapping("")
	// public ResponseEntity<ExhibitionResponse> updatePopUp(
	// 		Long id, 
	// 		ExhibitionRequest exhibitionRequest,
	// 		@RequestParam(name="image") List<MultipartFile> images, 
	// 		@RequestParam(name="poster") List<MultipartFile> posters, 
	// 		@AuthenticationPrincipal User user) throws IOException {
	// 	ExhibitionResponse exhibition = exService.updateExhibition(id, exhibitionRequest, images, posters, user);
	// 	return ResponseEntity.ok(exhibition);
	// }
	
	// 삭제
	@Operation(summary = "팝업/전시 삭제", description = "특정 팝업/전시를 삭제합니다.")
	@PatchMapping("/delete")
	public ResponseEntity<ExhibitionResponse> deletePopUp(Long id, @AuthenticationPrincipal User user) {
		ExhibitionResponse exhibition = exService.deleteExhibition(id, user);
		return ResponseEntity.ok(exhibition);
	}

	// 전제 조회
	@Operation(summary = "팝업/전시 목록", description = "팝업/전시 목록을 반환합니다.")
	@GetMapping("/{id}")
	public ResponseEntity<List<ExhibitionResponse>> getAllExhibition(@PathVariable(value = "id", required = false) Long id){
		List<ExhibitionResponse> exhibitionList = exService.getAllExhibition(id);
		return ResponseEntity.ok(exhibitionList);
	}
	
	// 특정 조회
	@Operation(summary = "특정 팝업 or 전시 조회(디테일)", description = "특정 팝업 or 전시(디테일)를 반환합니다.")
	@GetMapping("/detail/{id}")
	public ResponseEntity<ExhibitionResponse> getExhibitionById(Long id) {
		ExhibitionResponse exhibitionResponse = exService.getExhibitionById(id);
		return ResponseEntity.ok(exhibitionResponse);
	}
	
	// 자신이 작성한 팝업/전시 목록 불러오기
	@Operation(summary = "특정 팝업 or 전시 조회(디테일)", description = "특정 팝업 or 전시(디테일)를 반환합니다.")
	@GetMapping("/my-exhibition")
	public ResponseEntity<List<ExhibitionResponse>> getExhibitionByUser(@AuthenticationPrincipal User user) {
		List<ExhibitionResponse> exhibitionList = exService.getAllExhibitionByUser(user);
		return ResponseEntity.ok(exhibitionList);
	}

	// 검색을 통한 목록 불러오기
	@Operation(summary = "검색을 통한 목록 불러오기", description = "검색을 통한 목록을 반환합니다.")
	@GetMapping("/search")
	public ResponseEntity<List<ExhibitionResponse>> search(@RequestParam("keyword") String keyword) {
		List<ExhibitionResponse> result = exService.searchByKeyword(keyword);
		return ResponseEntity.ok(result);
	}
	
	// QR 생성
	@Operation(summary = "QR 생성", description = "QR 코드를 생성합니다.")
	@GetMapping("/qr-code")
	public ResponseEntity<byte[]> qrMaker(@RequestParam("link") String url) throws Exception {
		// QR 정보
		int width = 500;
		int height = 500;
		
		// QR code - BitMatrix: qr code 정보 생성
		BitMatrix encode = new MultiFormatWriter()
				.encode(url, BarcodeFormat.QR_CODE, width, height);
		
		// QR code - Image 생성 : 1회성으로 생성
		// stream으로 Generate(1회성 아니면 File로)
		try {
			// output Stream
			ByteArrayOutputStream out = new ByteArrayOutputStream();
			
			// Bitmatrix, file.format, outputStream
			MatrixToImageWriter.writeToStream(encode, "PNG", out);
			
			return ResponseEntity.ok()
					.contentType(MediaType.IMAGE_PNG)
					.body(out.toByteArray());
		} catch (Exception e) {
			log.warn("QR Code OutputStream 중 Exception 발생 : {}", e.getMessage());
		}
		return null;
	}
}

