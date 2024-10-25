//package com.popple.help.controller;
//
//import com.popple.auth.entity.User;
//import com.popple.help.domain.FaqAndHelpResponse;
//import com.popple.help.entity.FAQ;
//import com.popple.help.entity.Help;
//import com.popple.help.service.FAQService;
//import com.popple.help.service.HelpService;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.HttpStatusCode;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@Slf4j
//@RequiredArgsConstructor
//@RequestMapping("/api/help")
//public class FAQController {
//
//	private final FAQService faqService;
////    private final HelpService helpService;
//
//    @GetMapping("")
//    public ResponseEntity<FaqAndHelpResponse> getAllFAQs() {
//        List<FAQ> faqs = faqService.getAllFAQs();
//        List<Help> helps = helpService.getAllHelps();
//        String nickname = "ADMIN"; // 기본값
//
//        FaqAndHelpResponse response = FaqAndHelpResponse.create(faqs, helps, nickname, null); // createdAt은 null로 설정
//
//        return ResponseEntity.ok(response);
//    }
//
//    @GetMapping("/detail")
//    public ResponseEntity<FaqAndHelpResponse> getFAQById(@RequestParam("id") Long id) {
//        FAQ faq = faqService.getFAQById(id);
//        String nickname;
//
//        if (faq != null) {
//            nickname = "ADMIN"; // 기본값
//            FaqAndHelpResponse response = FaqAndHelpResponse.create(List.of(faq), List.of(), nickname, null); // createdAt은 null로 설정
//            return ResponseEntity.ok(response);
//        }
//
//        Help help = helpService.getHelpById(id);
//        if (help != null) {
//            nickname = (help.getUser() != null) ? help.getUser().getNickname() : "ADMIN"; // 닉네임 가져오기
//            String createdAt = help.getCreatedAt() != null ? help.getCreatedAt().toString() : null; // createdAt 가져오기
//            FaqAndHelpResponse response = FaqAndHelpResponse.create(List.of(), List.of(help), nickname, createdAt); // createdAt 설정
//            return ResponseEntity.ok(response);
//        }
//
//        return ResponseEntity.notFound().build();
//    }
//    
//    @PostMapping("/create")
//    public ResponseEntity<Help> createHelp(@AuthenticationPrincipal User user, @RequestBody Help help) {
//        help.setUser(user); 
//        Help createdHelp = helpService.createHelp(help);
//        return ResponseEntity.ok(createdHelp);
//    }
//
//    @DeleteMapping("/delete")
//    public ResponseEntity<String> deleteHelp(@RequestParam Long id, @AuthenticationPrincipal User user ){
//    	Help help=helpService.getHelpById(id);
//    	if (help==null) {
//    		return ResponseEntity.notFound().build();
//    	}
//    	
//    	if(!help.getUser().getId().equals(user.getId())) {
//    		return ResponseEntity.status(HttpStatus.FORBIDDEN).body("권한 없음");
//    	}
//    	helpService.deleteHelp(id);
//        return ResponseEntity.ok("삭제 완료");
//    }
//    
//    
//}
