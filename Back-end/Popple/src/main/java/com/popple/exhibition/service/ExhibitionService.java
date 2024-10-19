package com.popple.exhibition.service;

import java.util.List;import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.popple.auth.entity.User;
import com.popple.exhibition.domain.ExhibitionRequest;
import com.popple.exhibition.domain.ExhibitionResponse;
import com.popple.exhibition.entity.Exhibition;
import com.popple.exhibition.repository.ExhibitionRepository;
import com.popple.type.ExhiType;
import com.popple.type.repository.ExhiTypeRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ExhibitionService {
	private final ExhibitionRepository exhibitionRepository;
	private final ExhiTypeRepository exhiTypeRepository;

	// 팝업/전시 생성
	public ExhibitionResponse createExhibition(ExhibitionRequest req, User user) {
		// 타입 가져오기
		ExhiType type = exhiTypeRepository.findById(req.getTypeId()).orElseThrow(() -> new IllegalArgumentException("해당 분류가 없습니다."));
		
		// Exhibition 객체를 요청 데이터로 초기화
	    Exhibition exhibition = Exhibition.builder()
	            .user(user)  // 현재 사용자 설정
	            .type(type)
	            .exhibitionName(req.getExhibitionName())
	            .subTitle(req.getSubTitle())
	            .detailDescription(req.getDetailDescription())
	            .address(req.getAddress())
	            .notice(req.getNotice())
	            .terms(req.getTerms())
	            .grade(req.getGrade())
	            .fee(req.getFee())
	            .homepageLink(req.getHomepageLink())
	            .instagramLink(req.getInstagramLink())
	            .park(req.isPark())
	            .free(req.isFree())
	            .pet(req.isPet())
	            .food(req.isFood())
	            .wifi(req.isWifi())
	            .camera(req.isCamera())
	            .kids(req.isKids())
	            .sunday(req.getSunday())
	            .monday(req.getMonday())
	            .tuesday(req.getTuesday())
	            .wednesday(req.getWednesday())
	            .thursday(req.getThursday())
	            .friday(req.getFriday())
	            .saturday(req.getSaturday())
	            .startAt(req.getStartAt())
	            .endAt(req.getEndAt())
	            .build();
	    
	    // Exhibition 객체를 데이터베이스에 저장
	    exhibitionRepository.save(exhibition);

	    // ExhibitionResponse 생성
	    ExhibitionResponse response = ExhibitionResponse.builder()
	            .id(exhibition.getId())
	            .typeId(exhibition.getType().getId())
	            .exhibitionName(exhibition.getExhibitionName())
	            .subTitle(exhibition.getSubTitle())
	            .detailDescription(exhibition.getDetailDescription())
	            .address(exhibition.getAddress())
	            .notice(exhibition.getNotice())
	            .terms(exhibition.getTerms())
	            .grade(exhibition.getGrade())
	            .fee(exhibition.getFee())
	            .homepageLink(exhibition.getHomepageLink())
	            .instagramLink(exhibition.getInstagramLink())
	            .park(exhibition.isPark())
	            .free(exhibition.isFree())
	            .pet(exhibition.isPet())
	            .food(exhibition.isFood())
	            .wifi(exhibition.isWifi())
	            .camera(exhibition.isCamera())
	            .kids(exhibition.isKids())
	            .sunday(exhibition.getSunday())
	            .monday(exhibition.getMonday())
	            .tuesday(exhibition.getTuesday())
	            .wednesday(exhibition.getWednesday())
	            .thursday(exhibition.getThursday())
	            .friday(exhibition.getFriday())
	            .saturday(exhibition.getSaturday())
	            .startAt(exhibition.getStartAt())
	            .endAt(exhibition.getEndAt())
	            .build();
	    
	    return response; // 응답 반환
	}

		
	// 팝업/전시 삭제
	public ExhibitionResponse deleteExhibition(Long id, User user) throws IllegalAccessException {
		Exhibition exhibition = exhibitionRepository.findById(id).orElseThrow(() -> new IllegalAccessException("dd"));
		// 삭제 여부 바꿔주고
		exhibition.setDeleted(true);
		// 저장
		exhibitionRepository.save(exhibition);
		// id, 전시명, 삭제여부 만 담아서 response
		return ExhibitionResponse.builder()
	            .id(exhibition.getId())
	            .exhibitionName(exhibition.getExhibitionName())
	            .isDeleted(exhibition.isDeleted())
	            .build();
	}

//	// 팝업/전시 전체 조회
//	public List<ExhibitionResponse> getAllExhibition() {
//		List<Exhibition> exhibitions = exhibitionRepository.findAll();
////		ExhibitionResponse exhibitionResponse = exhibitionResponse.builder()
//		return exhibitions.stream().map(this::convertToResponse)
//				.collect(Collectors.toList);
//	}
//	
//	
	
}
