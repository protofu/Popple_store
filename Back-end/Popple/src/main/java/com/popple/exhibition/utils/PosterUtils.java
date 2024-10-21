package com.popple.exhibition.utils;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.popple.exhibition.entity.Image;
import com.popple.exhibition.entity.Poster;

@Component
public class PosterUtils {
	
	@Value("${spring.upload.poster_location}")
	private String uploadPath;
	
	public Poster posterUpload(MultipartFile poster) {
		try {
			// 원본 포스터명 가져오기
			String originalPosterName = poster.getOriginalFilename();
			// 포스터 크기 가져오기
			Long posterSize = poster.getSize();
			// 새로운 포스터명 만들어주기
			String savedPosterName = UUID.randomUUID() + "_" + originalPosterName;
			
			// 경로에 포스터 업로드
			InputStream inputStream = poster.getInputStream();
			Path path = Paths.get(uploadPath).resolve(savedPosterName);
			Files.copy(inputStream, path, StandardCopyOption.REPLACE_EXISTING);
			
			return Poster.builder()
					.posterName(originalPosterName)
					.savedName(savedPosterName)
					.fileSize(posterSize)
					.build();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}
