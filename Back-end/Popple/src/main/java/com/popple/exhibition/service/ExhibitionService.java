package com.popple.exhibition.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.popple.auth.entity.User;
import com.popple.exhibition.domain.ExhibitionRequest;
import com.popple.exhibition.domain.ExhibitionResponse;
import com.popple.exhibition.entity.Exhibition;
import com.popple.exhibition.entity.Image;
import com.popple.exhibition.entity.Poster;
import com.popple.exhibition.repository.ExhibitionRepository;
import com.popple.exhibition.repository.ImageRepository;
import com.popple.exhibition.repository.PosterRepository;
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
	private final PosterRepository posterRepository;
	private final ImageRepository imageRepository;
	private final ImageService imageService;
	private final PosterService posterService;
	
	// 팝업/전시 생성
	public ExhibitionResponse createExhibition(ExhibitionRequest req, List<MultipartFile> images, List<MultipartFile> posters, User user) {
		// 타입 가져오기
		System.out.println(req.getTypeId());
		ExhiType type = exhiTypeRepository.findById(req.getTypeId()).orElseThrow(() -> new IllegalArgumentException("해당 분류가 없습니다."));
		
		// Exhibition 객체를 요청 데이터로 초기화
	    Exhibition exhibition = Exhibition.builder()
	            .user(user)  // 현재 사용자 설정
	            .type(type)
	            .exhibitionName(req.getExhibitionName())
	            .subTitle(req.getSubTitle())
	            .detailDescription(req.getDetailDescription())
	            .address(req.getAddress())
	            .detailAddress(req.getDetailAddress())
	            .notice(req.getNotice())
	            .terms(req.getTerms())
	            .grade(req.isGrade())
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
	            .reserve(req.isReserve())
	            .build();
	    
	    // Exhibition 객체를 데이터베이스에 저장
	    exhibitionRepository.save(exhibition);
	    
	    // 이미지 저장하기
	    images.stream().map(image -> imageService.saveImage(image, exhibition)).collect(Collectors.toList());
	    // 포스터 저장하기
	    posters.stream().map(poster -> posterService.savePoster(poster, exhibition)).collect(Collectors.toList());

	    // ExhibitionResponse 생성
	    ExhibitionResponse response = convertToExhibitionResponse(exhibition, null);
	    
	    return response; // 응답 반환
	}
	
	// 팝업/전시 삭제
	public ExhibitionResponse deleteExhibition(Long id, User user) {
		Exhibition exhibition = exhibitionRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 팝업/전시를 찾을 수 없습니다."));
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
	
	// 팝업/전시 전체 조회 - 모든 전시를 조회
	public List<ExhibitionResponse> getAllExhibition() {
		// 종료되지 않은 (오늘 날짜가 지나지 않은) 전시만 조회
		LocalDate today = LocalDate.now();
		List<Exhibition> exhibitions = exhibitionRepository.findByEndAtAfterAndIsDeletedIsFalse(today);
		
		return exhibitions.stream()
				.map(e -> {
					return convertToExhibitionResponse(e, null);
				})
//				.map(this::entityToResponse)
				.collect(Collectors.toList());
	}

	// 팝업 또는 전시 전체 조회 - 타입에 따라 팝업 또는 전시를 인기순 조회
	public List<ExhibitionResponse> getAllPopularExhibition(Long typeId) {
		LocalDate today = LocalDate.now();
		List<Exhibition> exhibitions = exhibitionRepository.findExhibitionsOrderedByPopularityAndEndAtAfterAndIsDeletedIsFalse(typeId, today);
		return exhibitions.stream()
		.map(e -> {
			return convertToExhibitionResponse(e, null);
		})
		.collect(Collectors.toList());
	}

	// 팝업/전시 선택 전체 조회
	public List<ExhibitionResponse> getAllExhibition(Long id) {
		log.info("타입으로 리스트 조회 : {}", id);
		ExhiType type = exhiTypeRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("잘못된 타입 요청입니다."));
		LocalDate today = LocalDate.now();
		List<Exhibition> exhibitions = exhibitionRepository.findByEndAtAfterAndTypeAndIsDeletedIsFalse(today, type);

		// exhibitions의 각 요소를 response로 변환후 리스트화 하고 반환	
		return exhibitions.stream()
				.map(e -> {
					return convertToExhibitionResponse(e, null);
				})
				.collect(Collectors.toList());
	}
	
	// 특정 팝업 or 전시 조회(디테일)
	public ExhibitionResponse getExhibitionById(Long id) {
		Exhibition exhibition = exhibitionRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 팝업 혹은 전시가 존재하지 않습니다."));
		exhibition.setVisitCount(exhibition.getVisitCount()+1);
		Exhibition savedExhibition = exhibitionRepository.save(exhibition);
		ExhibitionResponse exhibitionResponse = convertToExhibitionResponse(savedExhibition, null);
		return exhibitionResponse;
	}

	// 자신이 만든 팝업/전시 찾기
	public List<ExhibitionResponse> getAllExhibitionByUser(User user) {
		// User로 모든 팝업/전시 찾고
		List<Exhibition> myExhibitions = exhibitionRepository.findAllByUserAndIsDeletedIsFalse(user);
		// 엔티티를 리스폰스로 변환 후
		List<ExhibitionResponse> myExhibitionsResponse = myExhibitions.stream().map(e -> convertToExhibitionResponse(e, null)).collect(Collectors.toList());
		// 반환
		return myExhibitionsResponse;
	}
	
	// 키워드 검색
	public List<ExhibitionResponse> searchByKeyword(String keyword, Long typeId) {
		LocalDate today = LocalDate.now();
		if (typeId == 0) {
			List<Exhibition> exList = exhibitionRepository.findByKeywordAndEndAtAfterAndIsDeletedIsFalse(keyword, today);
			return exList.stream().map(e -> {
				return convertToExhibitionResponse(e, fetchLocationFromKakao(e.getAddress()));
			}).collect(Collectors.toList());
		}
		List<Exhibition> exList = exhibitionRepository.findByKeywordAndTypeIdAndEndAtAfterAndIsDeletedIsFalse(keyword, typeId, today);
		return exList.stream().map(e -> {
			return convertToExhibitionResponse(e, fetchLocationFromKakao(e.getAddress()));
		}).collect(Collectors.toList());
	}
	
	public ExhibitionResponse updateExhi(User user, ExhibitionRequest req, List<MultipartFile> images,
			MultipartFile poster) {
		Exhibition ex = exhibitionRepository.findById(req.getExhiId()).orElseThrow(() -> new IllegalArgumentException("해당 팝업/전시를 찾을 수 없습니다."));
		if(ex.getUser().getId() == user.getId()) {
			
			ex.setDetailDescription(req.getDetailDescription());
			ex.setAddress(req.getAddress());
			ex.setStartAt(req.getStartAt());
			ex.setEndAt(req.getEndAt());
			ex.setExhibitionName(req.getExhibitionName());
			ex.setInstagramLink(req.getInstagramLink());
			ex.setHomepageLink(req.getHomepageLink());
			ex.setSubTitle(req.getSubTitle());
			ex.setReserve(req.isReserve());
			ex.setNotice(req.getNotice());
			
			if(images != null) {
				List<Image> prevImage = imageService.findAll();
				prevImage.forEach(i -> imageService.deleteImage(i.getId()));
				images.stream().map(image -> imageService.saveImage(image, ex)).collect(Collectors.toList());
			}
			if(poster != null) {
				Poster prevPoster = posterService.findPoster(req.getExhiId());
				posterService.deletePoster(prevPoster.getId());
				posterService.savePoster(poster, ex);
			}
		}
		return null;
	}

	private List<String> fetchLocationFromKakao(String address) {
		try {
			RestTemplate restTemplate = new RestTemplate();
			String url = "https://dapi.kakao.com/v2/local/search/keyword.json?query=" + address;
			HttpHeaders headers = new HttpHeaders();
			headers.set("Authorization", "KakaoAK " + "d9429f36679e29e07113c0688628ddcc"); // Use secure key retrieval
			HttpEntity entity = new HttpEntity(headers);
	
			String response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class).getBody();
			JsonObject jsonObject = new Gson().fromJson(response, JsonObject.class);
			
			if (jsonObject.getAsJsonArray("documents").size() > 0) {
				JsonObject doc = jsonObject.getAsJsonArray("documents").get(0).getAsJsonObject();
				return List.of(doc.get("x").getAsString(), doc.get("y").getAsString());
			}
		} catch (Exception ex) {
			log.error("주소 변환 에러: {}", ex.getMessage());
		}
		return null;
	}
	
	// Exhibition 엔티티를 ExhibitionResponse로 변환하는 메서드
	private ExhibitionResponse buildExhibitionResponse(Exhibition exhibition, String savedImage, List<String> descriptionImage, List<String> location) {
		return ExhibitionResponse.builder()
		.id(exhibition.getId())
		.typeId(exhibition.getType().getId())
		.exhibitionName(exhibition.getExhibitionName())
		.subTitle(exhibition.getSubTitle())
		.detailDescription(exhibition.getDetailDescription())
		.address(exhibition.getAddress())
		.detailAddress(exhibition.getDetailAddress())
		.notice(exhibition.getNotice())
		.terms(exhibition.getTerms())
		.grade(exhibition.isGrade())
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
		.savedImage(savedImage)
		.visitCount(exhibition.getVisitCount())
		.reserve(exhibition.isReserve())
		.descriptionImage(descriptionImage)
		.location(location)
		.nickname(exhibition.getUser().getNickname())
		.build();
	}
	
	private ExhibitionResponse convertToExhibitionResponse(Exhibition exhibition, List<String> location) {
		String savedImage = posterRepository.findFirstByExhibition(exhibition.getId()).orElse(null);
		List<String> descriptionImage = imageRepository.findByExhibition(exhibition.getId()).orElse(null);
		return buildExhibitionResponse(exhibition, savedImage, descriptionImage, location);
	}
}
