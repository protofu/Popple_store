package com.popple.exhibition.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.popple.auth.entity.User;
import com.popple.type.ExhiType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Entity
@EntityListeners(AuditingEntityListener.class)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Exhibition {
	//id
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(updatable = false)
	private Long id;
	
	//user id
	@JoinColumn(name = "user_id", nullable = false)
	@ManyToOne
	private User user;
	
    // 전시 종류 (팝업 / 전시)
    @JoinColumn(name = "type_id", nullable = false) // ExhiType 엔티티와 연결되는 컬럼
    @ManyToOne // 전시 유형별로 여러 전시가 있을 수 있으므로 다대일 관계로 설정
    private ExhiType type;
	
	//전시명
	@Column(nullable = false)
	private String exhibitionName;
	
	//부제
	@Column(nullable = false)
	private String subTitle;
	
	//상세설명
	@Column(nullable = true, length=2000)
	private String detailDescription;
	
	//전시주소
	@Column(nullable = false)
	private String address;
	
	//공지사항
	@Column(nullable = true)
	private String notice;
	
	//이용조건 (할지 모르겠음)
	@Column(nullable = true)
	private String terms;
	
	//입장료
	@Column(nullable = true)
	private String fee;
	
	//홈페이지 링크
	@Column(nullable = true)
	private String homepageLink;
	
	//인스타그램 링크
	@Column(nullable = true)
	private String instagramLink;
	
	//관람등급
	@Column(nullable = false)
	private boolean grade;
	
	//주차 여부
	@Column(nullable = false)
	private boolean park;
	
	//입장료 여부
	@Column(nullable = false)
	private boolean free;
	
	//동물 출입 여부
	@Column(nullable = false)
	private boolean pet;
	
	//음식 반입 여부
	@Column(nullable = false)
	private boolean food;
	
	//와이파이 여부
	@Column(nullable = false)
	private boolean wifi;
	
	//사진촬영 여부
	@Column(nullable = false)
	private boolean camera;
	
	//애들 출입 여부
	@Column(nullable = false)
	private boolean kids;
	
	//일요일
	@Column(nullable = false)
	private String sunday;
	
	//월요일
	@Column(nullable = false)
	private String monday;
	
	//화요일
	@Column(nullable = false)
	private String tuesday;
	
	//수요일
	@Column(nullable = false)
	private String wednesday;
	
	//목요일
	@Column(nullable = false)
	private String thursday;
	
	//금요일
	@Column(nullable = false)
	private String friday;
	
	//토요일
	@Column(nullable = false)
	private String saturday;
	
	//예약여부
	@Builder.Default
	@Column(nullable = false)
	private boolean reserve = false;
	
	//예약여부
	@Builder.Default
	@Column(nullable = false)
	private int visitCount = 0;
	
	//생성일자
	@CreatedDate
	@Column(name = "created_at", nullable = false)
	private LocalDateTime createdAt;
	
	//생성일자
	@LastModifiedDate
	@Column(name = "updated_at", nullable = false)
	private LocalDateTime updatedAt;
	
	//시작일자
	@Column(name = "start_at", nullable = false)
	private LocalDate startAt;
	
	//종료일자
	@Column(name = "end_at", nullable = false)
	private LocalDate endAt;
	
	//삭제여부
	@Builder.Default
	@Column(name = "is_deleted", nullable = false)
	private boolean isDeleted = false;	
	
}
