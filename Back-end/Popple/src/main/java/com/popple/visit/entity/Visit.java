package com.popple.visit.entity;

import java.time.LocalDateTime;

import com.popple.auth.entity.User;
import com.popple.company.entity.Company;
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
public class Visit {
	//id
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(updatable = false)
	private Long id;
	
	//요일 -> 1 월 ~~~ 7일
	@Column(nullable = false)
	private int weekday;
	
	//방문시간
	@Column(name = "visit_time", nullable = false)
	private LocalDateTime visitTime;
	
	//시간대
	@Column(name = "time_zone", nullable = false)
	private int timeZone;
	
	//전시 id
	@JoinColumn(name = "exhibition_id", nullable = false)
	@ManyToOne
	private Exhibition exhibition;
	
	//유저 id
	@JoinColumn(name = "user_id", nullable = false)
	@ManyToOne
	private User user;
	
	//기업 id
	@JoinColumn(name = "company_id", nullable = false)
	@ManyToOne
	private Company company;
}
