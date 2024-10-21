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

@Component
public class ImageUtils {
	
	@Value("${spring.upload.image_location}")
	private String uploadPath;
	
	public Image imageUpload(MultipartFile image) {
		try {
			// 원본 이미지명 가져오기
			String originalImageName = image.getOriginalFilename();
			// 이미지 크기 가져오기
			Long imageSize = image.getSize();
			// 새로운 이미지명 만들어주기
			String savedImageName = UUID.randomUUID() + "_" + originalImageName;
			
			// 경로에 이미지 업로드
			InputStream inputStream = image.getInputStream();
			Path path = Paths.get(uploadPath).resolve(savedImageName);
			Files.copy(inputStream, path, StandardCopyOption.REPLACE_EXISTING);
			
			return Image.builder()
					.imageName(originalImageName)
					.savedName(savedImageName)
					.fileSize(imageSize)
					.build();
		} catch (Exception e) {
			e.printStackTrace();
			
			return null;
		}
	}
}
