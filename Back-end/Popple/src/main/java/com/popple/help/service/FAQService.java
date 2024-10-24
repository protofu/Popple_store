package com.popple.help.service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.popple.auth.repository.UserRepository;
import com.popple.company.repository.CompanyRepository;
import com.popple.company.service.CompanyService;
import com.popple.help.entity.FAQ;
import com.popple.help.repository.FAQRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class FAQService {
	
    private final FAQRepository faqRepository;

    
    public void saveFAQs(List<FAQ> faqList) {
        faqRepository.saveAll(faqList);
    }

    
	public List<FAQ> getAllFAQs() {
		return faqRepository.findAll();
	}
    
    public void clearFAQs() {
        faqRepository.deleteAll();
    }


	public FAQ getFAQById(Long id) {
		Optional<FAQ> faq = faqRepository.findById(id);
	    if (faq.isPresent()) {
	        return faq.get();
	    } else {
	        return null; // 또는 Exception 던지기
	    }
	}
}
