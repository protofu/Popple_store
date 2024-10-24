package com.popple.help.domain;

import com.popple.help.entity.Help;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HelpResponse {

	private Long id;
    private String title;
    private String description;
    private String answer;
    private String createdAt;

    public static HelpResponse toDTO(Help help) {
        return HelpResponse.builder()
                .id(help.getId())
                .title(help.getTitle())
                .description(help.getDescription())
                .answer(help.getAnswer())
                .createdAt(help.getCreatedAt() != null ? help.getCreatedAt().toString() : null)
                .build();
    }

}
