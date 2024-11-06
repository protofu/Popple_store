package com.popple.exhibition.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.popple.exhibition.domain.PosterDTO;
import com.popple.exhibition.entity.Exhibition;
import com.popple.exhibition.entity.Poster;
import com.popple.exhibition.repository.PosterRepository;
import com.popple.exhibition.utils.PosterUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class PosterService {
	private final PosterRepository posterRepository;
	private final PosterUtils posterUtils;
	
	public Poster savePoster(MultipartFile poster, Exhibition exhibition) {
		if (poster != null) {
			Poster posterFile = posterUtils.posterUpload(poster);
			if (posterFile != null) {
				posterFile.setExhibition(exhibition);
				Poster savedPosterFile = posterRepository.save(posterFile);
				return savedPosterFile;
			}
		}
		return null;
	}
	
	public PosterDTO getPosterByPosterId(Long id) {
		Poster poster = posterRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 포스터가 존재하지 않습니다."));
		return PosterDTO.toDTO(poster);
	}

	public void deletePoster(Long id) {
		posterRepository.deleteById(id);
	}

	public Poster findPoster(Long exhiId) {
		Poster poster = posterRepository.findByExhibitionId(exhiId).orElseThrow(()-> new IllegalArgumentException("해당 포스터 찾을 수 없음."));
		return poster;
	}
}
