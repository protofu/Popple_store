package com.popple.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class SwaggerConfig implements WebMvcConfigurer {
	
	// Swagger UI에서 사용할 OpenAPI 설정을 Bean으로 등록
	@Bean
	public OpenAPI customOpenAPI() {
		return new OpenAPI()
			 // API 문서의 기본 정보를 설정 (제목, 버전, 설명)
			.info(new Info()
				.title("Popple API 문서")
				.version("v1")
				.description("Popple API 문서입니다."))
			// JWT 인증 방식에 대한 보안 설정 추가 (Swagger UI에서 OAuth2 등의 보안 스키마를 설정)
			.components(new Components().addSecuritySchemes("bearerAuth", 
				new SecurityScheme()
					.name("bearerAuth")				// 보안 스키마 이름
					.type(SecurityScheme.Type.HTTP)	// 보안 스키마 타입 (HTTP)
					.scheme("bearer")				// 스키마 방식 (Bearer)
					.bearerFormat("JWT")))			// Bearer 형식은 JWT
			// API 요청 시 'bearerAuth' 보안 설정이 필요함을 명시
			.addSecurityItem(new SecurityRequirement().addList("bearerAuth"));
	}
}
