package com.popple.help.controller;

import com.popple.help.entity.FAQ;
import com.popple.help.service.FAQService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/help")
public class FAQController {

    @Autowired
    private FAQService faqService;

    // 모든 FAQ 목록 조회
    @GetMapping("")
    public ResponseEntity<List<FAQ>> getAllFAQs() {
        List<FAQ> faqs = faqService.getAllFAQs();
        return ResponseEntity.ok(faqs);
    }
}