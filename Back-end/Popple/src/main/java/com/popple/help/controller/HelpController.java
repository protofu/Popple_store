package com.popple.help.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.popple.auth.entity.User;
import com.popple.help.domain.AnswerRequest;
import com.popple.help.domain.AnswerResponse;
import com.popple.help.domain.HelpRequest;
import com.popple.help.domain.HelpResponse;
import com.popple.help.service.HelpService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@Tag(name = "HELP", description = "HELP 관련 API")
@RequestMapping("/api/help")
public class HelpController {
    private final HelpService helpService;

    // HELP 목록 조회
    @Operation(summary = "HELP 목록 조회", description = "HELP 목록 조회합니다.")
    @GetMapping("")
    public ResponseEntity<List<HelpResponse>> getAllHelp() {
        List<HelpResponse> helps = helpService.getAllHelps();
        return ResponseEntity.ok(helps);
    }
    
    // 내 1:1 문의 조회
    @Operation(summary = "나의 HELP 목록 조회", description = "나의 HELP 목록 조회합니다.")
    @GetMapping("/my")
    public ResponseEntity<List<HelpResponse>> getAllMyHelp(@AuthenticationPrincipal User user) {
        List<HelpResponse> helps = helpService.getAllMyHelp(user);
        return ResponseEntity.ok(helps);
    }

    // 문의 생성
    @Operation(summary = "1:1 문의", description = "1:1 문의를 생성합니다.")
    @PostMapping("")
    public ResponseEntity<HelpResponse> createHelp(@RequestBody HelpRequest req, @AuthenticationPrincipal User user) {
    	log.info("문의 생성 : {}", req);
    	HelpResponse hRes = helpService.insert(req, user);
        return ResponseEntity.ok(hRes);
    }

    @Operation(summary = "1:1 문의 삭제", description = "1:1 문의를 삭제합니다.")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteHelp(@PathVariable("id") Long id, @AuthenticationPrincipal User user ){
    	log.info("문의 삭제 : {}", id);
    	boolean isDelete = helpService.delete(id, user);
    	if (isDelete) {
    		return ResponseEntity.ok().body("성공적으로 삭제되었습니다.");    		
    	}
    	return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("error");
    }
    
	@Operation(summary = "1:1 문의 답글", description = "1:1 문의의 답글을 작성합니다.")
	@PatchMapping("")
	public ResponseEntity<AnswerResponse> answerHelp(@RequestBody AnswerRequest req, @AuthenticationPrincipal User user ){
		log.info("답변 : {}", req);
		AnswerResponse res = helpService.reply(req, user);
	    return ResponseEntity.ok().body(res);
	}
	
	@Operation(summary = "1:1 문의 상세조회", description = "1:1 문의를 상세 조회 합니다.")
	@GetMapping("/{id}")
	public ResponseEntity<HelpResponse> detailHelp(@PathVariable("id") Long id, @AuthenticationPrincipal User user ){
		log.info("문의 상세조회 : {}", id);
		HelpResponse res = helpService.getHelp(id, user);
	    return ResponseEntity.ok().body(res);
	}
    
    
}
