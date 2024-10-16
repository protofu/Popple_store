package com.popple.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.popple.auth.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	// 삭제되지 않은 유저 중 Email로 조회
	Optional<User> findByEmailAndDeletedAtIsNull(String email);
	
	//이메일 중복 확인
	boolean existsByEmailAndDeletedAtIsNull(String email);

	Optional<User> findByCompId(Long id);

	boolean existsByNicknameAndDeletedAtIsNull(String nickname);
	
}
