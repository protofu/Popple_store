package com.popple.company.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.popple.auth.entity.User;
import com.popple.company.domain.CompanyRequest;
import com.popple.company.domain.CompanyResponse;
import com.popple.company.service.CompanyService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@Tag(name = "기업", description = "기업 관련 API")
@RequestMapping("api/company")
public class CompanyController {
	
	private final CompanyService companyService;
	
	
	@Operation(summary = "기업 회원 가입", description = "기업 회원 가입을 진행합니다.")
	@PostMapping("/create")
	public ResponseEntity<CompanyResponse> createCompany(@RequestBody CompanyRequest companyRequest){
		CompanyResponse com = companyService.createCompany(companyRequest);
		return ResponseEntity.status(HttpStatus.CREATED).body(com);
	}
	
	@Operation(summary = "기업 회원 정보 수정", description = "기업 회원 정보를 수정합니다.")
	@PatchMapping("/update/{id}")
	public ResponseEntity<CompanyResponse> updateCompany(@RequestBody CompanyRequest companyRequest, @AuthenticationPrincipal User user ) {
		CompanyResponse com = companyService.updateCompany(companyRequest, user);
		return ResponseEntity.ok(com);
	}
	
	@Operation(summary = "특정 기업 회원 조회", description = "특정 기업 회원 정보를 조회합니다.")
	@GetMapping("/{id}")
	public ResponseEntity<CompanyResponse> getCompany(@PathVariable("id") Long id){
		CompanyResponse com = companyService.getCompany(id);
		return ResponseEntity.ok(com);
	}
	
	@Operation(summary = "기업 삭제", description = "특정 기업을 삭제합니다.")
	@PatchMapping("/delete/{id}")
	public ResponseEntity<CompanyResponse> deleteCompany(@PathVariable("id") Long id, User user){
		CompanyResponse com = companyService.deleteCompany(id, user);
		return ResponseEntity.ok(com);
	}

	@Operation(summary = "기업 정보 조회", description = "로그인한 기업 회원의 기업 정보 반환")
	@GetMapping("")
	public ResponseEntity<CompanyResponse> getCompanyInfoByLoginUser(@AuthenticationPrincipal User user){
		CompanyResponse com = companyService.getCompany(user.getCompId());
		return ResponseEntity.ok(com);
	}

}
