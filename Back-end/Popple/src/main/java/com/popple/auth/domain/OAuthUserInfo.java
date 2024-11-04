package com.popple.auth.domain;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OAuthUserInfo {
	String key;
	String email;
	String name; 
	String nickname;
	boolean gender;
	LocalDate birth;
	String provider;
	boolean isDeleted;
	
	public boolean isAbleToLogin() {
		if (this.getKey() != null && this.getEmail() != null
			&& this.getName() != null && this.getNickname() != null  
			&& this.getBirth() != null && this.getProvider() != null
		) return true;
		
		return false;
	}
}
