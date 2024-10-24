package com.popple.help.domain;

import java.util.List;
import java.util.stream.Collectors;

import com.popple.help.entity.FAQ;
import com.popple.help.entity.Help;

import lombok.Builder;
import lombok.Data;
@Data
@Builder
public class FaqAndHelpResponse {
	private List<FAQResponse> faqs;
    private List<HelpResponse> helps;
    private String nickname;
    private String createdAt;

    public static FaqAndHelpResponse create(List<FAQ> faqs, List<Help> helps, String nickname, String createdAt) {
        return FaqAndHelpResponse.builder()
                .faqs(faqs.stream()
                        .map(FAQResponse::toDTO)
                        .collect(Collectors.toList()))
                .helps(helps.stream()
                        .map(HelpResponse::toDTO)
                        .collect(Collectors.toList()))
                .nickname(nickname)
                .createdAt(createdAt)
                .build();
    }
}
