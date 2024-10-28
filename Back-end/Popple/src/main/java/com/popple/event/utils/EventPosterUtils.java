package com.popple.event.utils;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.popple.event.entity.EventPoster;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class EventPosterUtils {
	@Value("${spring.upload.event_poster_location}")
	private String uploadPath;

	public EventPoster eventPosterUpload(MultipartFile eventPoster) {
		try {
			
			// 원본 이미지명 가져오기
			String originalPosterName = eventPoster.getOriginalFilename();
			// 이미지 크기 가져오기
			Long mageSize = eventPoster.getSize();
			// 새로운 이미지명 만들어주기
			String savedPosterName = UUID.randomUUID() + "_" + originalPosterName;

			// 경로에 이미지 업로드
			InputStream inputStream = eventPoster.getInputStream();
			Path path = Paths.get(uploadPath).resolve(savedPosterName);
			Files.copy(inputStream, path, StandardCopyOption.REPLACE_EXISTING);
			
			return EventPoster.builder()
					.posterName(originalPosterName)
					.savedName(savedPosterName)
					.fileSize(mageSize)
					.build();

			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}
