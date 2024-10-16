package com.popple.like;

import com.popple.auth.entity.User;
import com.popple.exhibition.entity.Exhibition;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Entity
@Data
@Table(name = "likes")
@AllArgsConstructor
@NoArgsConstructor
public class Like {
	//id
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(updatable = false)
	private Long id;
	
	@JoinColumn(name = "user_id", nullable = false)
	@ManyToOne
	private User user;
	
	@JoinColumn(name = "exhibition_id", nullable = false)
	@ManyToOne
	private Exhibition exhibition;
		
}
