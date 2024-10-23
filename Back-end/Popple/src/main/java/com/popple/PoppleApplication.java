package com.popple;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import com.popple.help.service.FAQService;
import com.popple.help.util.FAQlist;

@SpringBootApplication
@EnableJpaAuditing
public class PoppleApplication {

	public static void main(String[] args) {
		SpringApplication.run(PoppleApplication.class, args);
	}

	@Bean
    public CommandLineRunner run(FAQService faqService) {
        return args -> {
        	faqService.clearFAQs();
            faqService.saveFAQs(FAQlist.getFAQs());
        };
    }
}
