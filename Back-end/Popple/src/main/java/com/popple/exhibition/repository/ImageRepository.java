package com.popple.exhibition.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.popple.exhibition.entity.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

}
