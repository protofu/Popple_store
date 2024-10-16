package com.popple.event.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.popple.exhibition.entity.Exhibition;

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
public class Event {
	
	//id
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(updatable = false)
	private Long id;
	
	//전시id
	@JoinColumn(name = "exhibition_id", nullable = false)
	@ManyToOne
	private Exhibition exhibition;
	
	//이벤트이름
	@Column(nullable = false)
	private String eventName;
	
	//요약설명
	@Column(nullable = false)
	private String summary;
	
	//상세설명
	@Column(nullable = false)
	private String description;
	
	//시작일자
	@Column(name = "start_at", nullable = false)
	private LocalDate startAt;
	
	//종료일자
	@Column(name = "end_at", nullable = false)
	private LocalDate endAt;
	
	//생성일자
	@Column(name = "created_at", nullable = false)
	private LocalDateTime createdAt;
	
}
