package com.popple.auth.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.popple.auth.domain.RoleEnum;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="user")
@EntityListeners(AuditingEntityListener.class) // 생성, 수정 날짜 추적 -> Application.java (@EnableJpaAuditing)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails {
	private static final long serialVersionUID = 1L; // serialVersionUID 추가
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(updatable=false)
	private Long id;
	
	@Column(nullable=true)
	private Long compId;
	
	@Column(nullable=false)
	private String name;
	
	@Column(nullable=false, unique=true)
	private String nickname;
	
	@Column(nullable=false, unique=true)
	private String email;
	
	@Column(nullable=true)
	private String password;
	
	@Column(nullable=false)
	private LocalDate birth;
	
	@Column(nullable=false)
	private boolean gender;
	
	@Column(nullable=false)
	@Enumerated(EnumType.STRING)
	@Builder.Default
	private RoleEnum role = RoleEnum.ROLE_USER;		// 기본적으로 USER 부여
	
	@Column(name="refreshToken", nullable=true)
	public String refreshToken;
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(new SimpleGrantedAuthority(role.name()));
	}
	
	@CreatedDate
	@Column(name="created_at")
	private LocalDateTime createdAt;
	
	@LastModifiedDate
	@Column(name="updated_at")
	private LocalDateTime updatedAt;
	
	@Column(name="deleted_at")
	private LocalDateTime deletedAt;
	
	@Override
	public String getUsername() {
		return email;
	}
}
