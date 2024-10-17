package com.popple.auth.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.popple.auth.entity.UserAuth;


@Repository
public interface UserAuthRepository extends JpaRepository<UserAuth, Long>{

	Optional<UserAuth> findByAuthKeyAndProvider(String key, String provider);

    List<UserAuth> findAllByUserId(Long id);
	
}
