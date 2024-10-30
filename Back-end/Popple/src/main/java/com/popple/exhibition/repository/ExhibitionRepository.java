package com.popple.exhibition.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.popple.auth.entity.User;
import com.popple.exhibition.entity.Exhibition;
import com.popple.type.ExhiType;

@Repository
public interface ExhibitionRepository extends JpaRepository<Exhibition, Long> {

	List<Exhibition> findAllByUser(User user);

	List<Exhibition> findByExhibitionNameContainsOrAddressContains(String keyword, String keyword2);

	List<Exhibition> findAllByType(ExhiType type);

}
