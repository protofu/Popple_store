package com.popple.reservation.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.popple.auth.entity.User;
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
public class Reservation {

	//id
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(updatable = false)
	private Long id;
	
	// 팝업
	@JoinColumn(name = "exhibition_id", nullable = false)
	@ManyToOne
	private Exhibition exhibition;
	
	// 유저
	@JoinColumn(name = "user_id", nullable = false)
	@ManyToOne
	private User user;
	
	// 예약 일자
	@Column(name="reservation_date", nullable = false)
	private LocalDateTime reservationDate;
	
	// 예약 생성 일자
	@CreatedDate
	@Column(name="created_at", nullable = false)
	private LocalDateTime createdAt;
	
	// 예약 취소 시간
	@Column(name="deleted_at", nullable = true)
	private LocalDateTime deletedAt;
	
	// 참석 여부
	@Builder.Default
	@Column(name="is_attend", nullable = false)
	private boolean isAttend = false;
}
