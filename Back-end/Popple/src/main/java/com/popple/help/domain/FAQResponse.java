package com.popple.help.domain;


import com.popple.help.entity.FAQ;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FAQResponse {
	private Long id;
    private String title;
    private String description;

    public static FAQResponse toDTO(FAQ faq) {
        return FAQResponse.builder()
                .id(faq.getId())
                .title(faq.getTitle())
                .description(faq.getDescription())
                .build();
    }

}
