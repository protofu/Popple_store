package com.popple.help.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import com.popple.auth.entity.User;

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
public class Help {
	//id
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(updatable = false)
	private Long id;
	
	//유저 id
	@JoinColumn(name = "user_id", nullable = false)
	@ManyToOne
	private User user;
	
	//문의 내용
	@Column(nullable = false)
	private String description;
	
	//문의 제목
	@Column(nullable = false)
	private String title;
	
	//답변
	@Column(nullable = true)
	private String answer;
	
	//문의 일자
	@CreatedDate
	@Column(name = "created_at", nullable = false)
	private LocalDateTime createdAt;
	
	//답변 일자
	@Column(name = "updated_at", nullable = false)
	private LocalDateTime updatedAt;
	
}
