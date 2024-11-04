package com.popple.exhibition.domain;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExhibitionRequest {
	private Long typeId;
	private String exhibitionName;
	private String subTitle;
	private String detailDescription;
	private String address;
	private String detailAddress;
	private String notice;
	private String terms;
	private boolean grade;
	private String homepageLink;
	private String instagramLink;
	private String fee;
	private boolean park = false;
	private boolean free = false;
	private boolean pet = false;
	private boolean food = false;
	private boolean wifi= false;
	private boolean camera = false;
	private boolean kids = false;
	private String sunday;
	private String monday;
	private String tuesday;
	private String wednesday;
	private String thursday;
	private String friday;
	private String saturday;
	private LocalDate startAt;
	private LocalDate endAt;
	private boolean reserve;
}
