package com.popple.review.util;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.popple.review.entity.ReviewImage;

@Component
public class FileUtils {

	@Value("${spring.upload.review_location}")
	private String uploadPath;

	public ReviewImage fileUpload(MultipartFile file) {
		try {
			// 원본 파일명 가져오기
			String originalFileName = file.getOriginalFilename();
			// 파일 크기 가져오기
			Long fileSize = file.getSize();
			// 저장할 파일명
			String savedFileName = UUID.randomUUID() + "_" + originalFileName;
			
			// 해당 경로에 파일 이미지 업로드
			InputStream inputStream = file.getInputStream();
			Path path = Paths.get(uploadPath).resolve(savedFileName);
			Files.copy(inputStream, path, StandardCopyOption.REPLACE_EXISTING);
			
			// 이상 없다면 새 Image 객체 반환
			return ReviewImage.builder()
				.imageName(originalFileName)
				.savedName(savedFileName)
				.fileSize(fileSize)
				.build();
		} catch (Exception e) {
			e.printStackTrace();
			// 이상 있다면 null 반환
			return null;
		}
	}
}
