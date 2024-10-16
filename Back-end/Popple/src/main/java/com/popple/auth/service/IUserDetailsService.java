package com.popple.auth.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.popple.auth.entity.User;
import com.popple.auth.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class IUserDetailsService implements UserDetailsService {
	private final UserRepository userRepo;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		log.info("[loadUserByUsername] 사용자 이메일 조회. username: {}", email);
		User user = userRepo.findByEmailAndDeletedAtIsNull(email)
				.orElseThrow(() -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다."));
		if (user == null) {
			throw new UsernameNotFoundException("유저를 찾을 수 없음");
		}
		return user;
	}

}
