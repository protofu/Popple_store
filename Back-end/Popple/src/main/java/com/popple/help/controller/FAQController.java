package com.popple.help.controller;

import com.popple.help.entity.FAQ;
import com.popple.help.service.FAQService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/help")
public class FAQController {

    private final FAQService faqService;

    public FAQController(FAQService faqService) {
        this.faqService = faqService;
    }

    // 모든 FAQ 목록 조회
    @GetMapping("")
    public ResponseEntity<List<FAQ>> getAllFAQs() {
        List<FAQ> faqs = faqService.getAllFAQs();
        return ResponseEntity.ok(faqs);
    }

    @GetMapping("/detail")
    public ResponseEntity<FAQ> getFAQById(@RequestParam("id") Long id) {
        FAQ faq = faqService.getFAQById(id);
        if (faq == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(faq);
    }


}
