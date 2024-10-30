package com.popple.exhibition.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ExhibitionResponse {
    private Long id; // 전시 고유 ID
    private Long typeId;
    private String exhibitionName;
    private String subTitle;
    private String detailDescription;
    private String address;
    private String notice;
    private String terms;
    private boolean grade;
    private String fee;
    private String homepageLink;
    private String instagramLink;
    private boolean park;
    private boolean free;
    private boolean pet;
    private boolean food;
    private boolean wifi;
    private boolean camera;
    private boolean kids;
    private String sunday;
    private String monday;
    private String tuesday;
    private String wednesday;
    private String thursday;
    private String friday;
    private String saturday;
    private LocalDate startAt;
    private LocalDate endAt;
    private LocalDateTime createdAt;  // 전시 생성 시간
    private LocalDateTime updatedAt;  // 전시 업데이트 시간
    private boolean isDeleted;  // 삭제 여부
    private String savedImage;
    private int visitCount;
}
