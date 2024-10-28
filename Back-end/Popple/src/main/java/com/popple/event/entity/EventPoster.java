package com.popple.event.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor		
public class EventPoster {
	//id
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(updatable = false)
	private Long id;
		
	//이벤트 id// 포스터
	@Column(nullable = false)
	private String posterName;
	
	// 저장된 포스터 이름
	@Column(nullable = false, name = "saved_name")
	private String savedName;
	
	// 파일 사이즈
	@Column(nullable = false, name = "file_size")
	private Long fileSize;

	// 이벤트와의 다대일 관계 설정
	@JoinColumn(name = "event_id")
	@ManyToOne
	private Event event;

}
