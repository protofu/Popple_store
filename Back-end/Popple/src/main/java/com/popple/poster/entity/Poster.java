package com.popple.poster.entity;

import com.popple.exhibition.entity.Exhibition;

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
public class Poster {
	//id
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(updatable = false)
	private Long id;
	
	//전시 id
	@JoinColumn(name = "exhibition_id", nullable = false)
	@ManyToOne
	private Exhibition exhibition;
	
	//포스터 이미지
	@Column(nullable = true)
	private String poster;
	
}
