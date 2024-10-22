package com.popple.company.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Entity
@Data
@EntityListeners(AuditingEntityListener.class) // 생성, 수정 날짜 추적 -> Application.java (@EnableJpaAuditing)
@AllArgsConstructor
@NoArgsConstructor
public class Company {
	
	//id
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(updatable = false)
	private Long id;
	
	//사업자등록번호
	@Column(name = "buisiness_number", nullable = false)
	private String buisinessNumber;
	
	//기업업종
	@Column(nullable = false)
	private String sector;
	
	//기업명
	@Column(nullable = false)
	private String name;
	
	//기업주소
	@Column(nullable = false)
	private String address;
	
	//연락처
	@Column(nullable = false)
	private String tel;
	
	//대표자
	@Column(nullable = false)
	private String leader;
	
	//탈퇴 시간
	@Column(name = "deleted_at")
	private LocalDateTime deletedAt;
	
	//둥록 시간
	@CreatedDate
	@Column(name = "created_at")
	private LocalDateTime createdAt;
	
	//수정 시간
	@LastModifiedDate
	@Column(name = "updated_at")
	private LocalDateTime updatedAt;
}
