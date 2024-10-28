package com.popple.event.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventImage {
	// id
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(updatable = false)
	private Long id;

	// 이벤트 이미지
	@Column(nullable = true)
	private String image;

	// 파일 사이즈
	@Column(nullable = false, name = "file_size")
	private Long fileSize;

	// 저장된 이미지 이름
	@Column(nullable = false, name = "saved_name")
	private String savedName;

	// 대표이미지 여부
	@Column(name = "is_main")
	private boolean isMain;

	// 이벤트와의 다대일 관계 설정
	@ManyToOne
	@JoinColumn(name = "event_id")
	private Event event;

}
