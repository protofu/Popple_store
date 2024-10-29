package com.popple.help.domain;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class HelpRequest {
	private Long id;
	private String title;
	private String description;
}
