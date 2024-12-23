package com.popple.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebMvcConfig implements WebMvcConfigurer {
	// 후에 file을 받아오기 위해 일단 생성해둔 class
	@Value("${spring.upload.review_location}")
	private String reviewPath;
	@Value("${spring.upload.event_poster_location}")
	private String eventPosterPath;
	@Value("${spring.upload.image_location}")
	private String imagePath;
	@Value("${spring.upload.poster_location}")
	private String posterPath;
	@Value("${spring.upload.event_image_location}")
	private String eventImagePath;
	@Value("${spring.front_url}")
	private String front_url;

	@Override
	public void addCorsMappings(@NonNull CorsRegistry registry) {
		registry
		.addMapping("/**")
		.allowedOrigins(front_url)
		.allowedMethods("OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE")
		.allowedHeaders("*") // 모든 헤더 허용
		.allowCredentials(true); // 자격 증명 허용 (쿠키, 인증 정보)
	}

	@Override
	public void addResourceHandlers(@NonNull ResourceHandlerRegistry registry) {
		registry
		.addResourceHandler("/file/review_image/**")
		.addResourceLocations("file:"+reviewPath + "/");
		registry
		.addResourceHandler("/file/image/**")
		.addResourceLocations("file:"+imagePath + "/");
		registry
		.addResourceHandler("/file/poster/**")
		.addResourceLocations("file:"+posterPath + "/");
		registry
		.addResourceHandler("/file/event_poster_image/**")
		.addResourceLocations("file:"+eventPosterPath + "/");
		registry
		.addResourceHandler("/file/event_image/**")
		.addResourceLocations("file:"+eventImagePath + "/");
	}
}
