package com.popple.visit.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Period;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.popple.auth.entity.User;
import com.popple.auth.repository.UserRepository;
import com.popple.company.entity.Company;
import com.popple.company.repository.CompanyRepository;
import com.popple.exhibition.entity.Exhibition;
import com.popple.exhibition.repository.ExhibitionRepository;
import com.popple.like.entity.Like;
import com.popple.reservation.entity.Reservation;
import com.popple.reservation.repository.ReservationRepository;
import com.popple.visit.domain.CheckResponse;
import com.popple.visit.domain.StatsResponse;
import com.popple.visit.entity.Visit;
import com.popple.visit.repository.VisitRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class VisitService {
	private final VisitRepository visitRepository;
	private final ExhibitionRepository exhibitionRepository;
	private final ReservationRepository reservationRepository;
	private final CompanyRepository companyRepository;
	private final UserRepository userRepository;
	
	// 10:00부터 22:00까지 2시간 단위의 하드코딩된 슬롯 배열
    private static final LocalTime[] TIME_SLOTS = {
        LocalTime.of(10, 0),
        LocalTime.of(12, 0),
        LocalTime.of(14, 0),
        LocalTime.of(16, 0),
        LocalTime.of(18, 0),
        LocalTime.of(20, 0),
        LocalTime.of(22, 0)
    };
	
    // 방문 체크
	public CheckResponse insert(Long exId, User user) {
		// // 예약 목록을 불러오고
		// Optional<Reservation> optReservation = reservationRepository.findByUserIdAndExhibitionId(user.getId(), exId);
		// // 예약이 존재한다면 참석여부를 true로 초기화 후 저장
		// if (optReservation.isPresent()) {
		// 	Reservation reservation = optReservation.get();
		// 	reservation.setAttend(true);
		// 	reservationRepository.save(reservation);
		// }
		// 전시 불러오기
		Exhibition exhi = exhibitionRepository.findById(exId).orElseThrow(() -> new IllegalArgumentException("해당 팝업/전시가 존재하지 않습니다."));
		// 기업회원 불러오기
		User compUser = userRepository.findById(exhi.getUser().getId()).orElseThrow(() -> new IllegalArgumentException("해당 유저가 기업회원이 아닙니다."));
		// 기업 불러오기
		Company comp = companyRepository.findById(compUser.getCompId()).orElseThrow(() -> new IllegalArgumentException("해당 기업이 존재하지 않습니다."));
		// 현재 시간
		LocalDateTime now = LocalDateTime.now();
		// 현재 시간을 기준으로
		LocalTime visitTime = now.toLocalTime();
		// 시간기준 timezone 구하고
		int timeZone = getTimeSlotIndex(visitTime);
		// 요일을 enum 타입으로 나타내고
		int dayOfWeekNumber = now.getDayOfWeek().getValue();
		
		
		Visit visit = new Visit();
		visit.setUser(user);				// 현재 예약 유저 셋
		visit.setExhibition(exhi);			// 현재 전시 셋
		visit.setCompany(comp);				// 현재 전시의 기업 셋
		visit.setTimeZone(timeZone);		// 시간대 저장
		visit.setVisitTime(now);			// 현재 시간 셋
		visit.setWeekday(dayOfWeekNumber); 	// 요일 셋
		
		// 저장
		Visit savedVisit = visitRepository.save(visit);
		// 리스폰스로 바꿔서
		CheckResponse visitResponse = CheckResponse.builder()
				.id(savedVisit.getId())
				.username(savedVisit.getUser().getUsername())
				.build();
		// 반환
		return visitResponse;
	}
	
	
	// 방문 시간에 따라 시간 슬롯 인덱스를 계산
    private static int getTimeSlotIndex(LocalTime visitTime) {
        for (int i = 0; i < TIME_SLOTS.length - 1; i++) {
            LocalTime slotStart = TIME_SLOTS[i];
            LocalTime slotEnd = TIME_SLOTS[i + 1];
            
            // 방문 시간이 현재 슬롯 시작과 다음 슬롯 시작 사이에 속할 경우
            if ((visitTime.equals(slotStart) || visitTime.isAfter(slotStart)) && visitTime.isBefore(slotEnd)) {
                return i + 1;
            }
        }

        // 방문 시간이 정확히 22:00인 경우 마지막 슬롯 반환
        if (visitTime.equals(TIME_SLOTS[TIME_SLOTS.length - 1])) {
            return TIME_SLOTS.length - 1;
        }

        return -1; // 시간 범위를 벗어난 경우
    }
    
    // 요일 통계
    public StatsResponse getWeekStatistic(Long exId, boolean isCompany) {
    	// 요일별 통계 맵 초기화
        Map<String, Integer> weekStats = new HashMap<>();
        // 초기값 설정 (예: 모든 요일을 0으로 초기화)
        weekStats.put("mon", 0);
        weekStats.put("tue", 0);
        weekStats.put("wed", 0);
        weekStats.put("thu", 0);
        weekStats.put("fri", 0);
        weekStats.put("sat", 0);
        weekStats.put("sun", 0);
        // 팝업 ID 혹은 기업ID를 통해서 모든 방문자 리스트 가져오기
        List<Visit> visitors;
        if (isCompany) {
        	Exhibition exhi = exhibitionRepository.findById(exId).orElseThrow(() -> new IllegalArgumentException("찾는 팝업/전시가 없습니다."));
            visitors = visitRepository.findAllByCompanyId(exhi.getUser().getCompId()); // 기업 ID로 방문자 리스트 가져오기
        } else {
        	visitors = visitRepository.findAllByExhibitionId(exId);
        }
        // visitors에서 weekday 가져와서 비교하여 Map에 설정
        for (Visit visit : visitors) {
            int weekday = visit.getWeekday(); // 요일을 1~7로 가져옴

            // 요일에 따라 통계 업데이트
            switch (weekday) {
	            case 1: weekStats.put("mon", weekStats.get("mon") + 1); break;
	            case 2: weekStats.put("tue", weekStats.get("tue") + 1); break;
	            case 3: weekStats.put("wed", weekStats.get("wed") + 1); break;
	            case 4: weekStats.put("thu", weekStats.get("thu") + 1); break;
	            case 5: weekStats.put("fri", weekStats.get("fri") + 1); break;
	            case 6: weekStats.put("sat", weekStats.get("sat") + 1); break;
	            case 7: weekStats.put("sun", weekStats.get("sun") + 1); break;
            }
        }
        
        // WeekResponse 객체 생성 및 반환
        return StatsResponse.builder()
                .stats(weekStats)
                .build();
    }

    // 성별 통계
	public StatsResponse getGenderStatistic(Long exId, boolean isCompany) {
		// 성별 통계 맵 초기화
        Map<String, Integer> genderStats = new HashMap<>();
        // 초기값 설정
        genderStats.put("male", 0);
        genderStats.put("female", 0);
     // 팝업 ID 혹은 기업ID를 통해서 모든 방문자 리스트 가져오기
        List<Visit> visitors;
        if (isCompany) {
        	Exhibition exhi = exhibitionRepository.findById(exId).orElseThrow(() -> new IllegalArgumentException("찾는 팝업/전시가 없습니다."));
            visitors = visitRepository.findAllByCompanyId(exhi.getUser().getCompId()); // 기업 ID로 방문자 리스트 가져오기
        } else {
        	visitors = visitRepository.findAllByExhibitionId(exId);
        }
        // visitors에서 user의 gender 가져와서 비교하여 Map에 설정
        for (Visit visit : visitors) {
            boolean gender = visit.getUser().isGender(); // 성별을 true false로 가져옴
            // 성별에 따라 통계 업데이트
            if (gender) genderStats.put("male", genderStats.get("male") + 1);
            else genderStats.put("female", genderStats.get("female") + 1);
        }
        
		return StatsResponse.builder()
				.stats(genderStats)
				.build();
	}

	// 나이별 통계
	public StatsResponse getAgeStatistic(Long exId, boolean isCompany) {
		// 성별 통계 맵 초기화
        Map<String, Integer> ageStats = new HashMap<>();
        // 초기값 설정
        ageStats.put("Teens", 0);       // 10대
        ageStats.put("Twenties", 0);    // 20대
        ageStats.put("Thirties", 0);    // 30대
        ageStats.put("Forties", 0);     // 40대
        ageStats.put("Fifties_above", 0);     // 50대 이상
        // 팝업 ID 혹은 기업ID를 통해서 모든 방문자 리스트 가져오기
        List<Visit> visitors;
        if (isCompany) {
        	Exhibition exhi = exhibitionRepository.findById(exId).orElseThrow(() -> new IllegalArgumentException("찾는 팝업/전시가 없습니다."));
            visitors = visitRepository.findAllByCompanyId(exhi.getUser().getCompId()); // 기업 ID로 방문자 리스트 가져오기
        } else {
        	visitors = visitRepository.findAllByExhibitionId(exId);
        }
        LocalDate currentDate = LocalDate.now(); // 현재 날짜 가져오기
        for (Visit visit : visitors) {
            LocalDate birth = visit.getUser().getBirth(); // 사용자의 생년월일 가져오기
            int age = Period.between(birth, currentDate).getYears(); // 나이 계산

            if (age < 10) continue; // 10세 미만은 제외
            
            String ageGroup;
            if (age < 20) {
                ageGroup = "Teens";
            } else if (age < 30) {
                ageGroup = "Twenties";
            } else if (age < 40) {
                ageGroup = "Thirties";
            } else if (age < 50) {
                ageGroup = "Forties";
            } else {
                ageGroup = "Fifties_above";
            }
            ageStats.put(ageGroup, ageStats.get(ageGroup) + 1); // 해당 나이 그룹 카운트 증가
        }
        
        return StatsResponse.builder()
                .stats(ageStats)
                .build();
	}

	// 시간대별 통계
	public StatsResponse getTimeStatistic(Long exId, boolean isCompany) {
		// 시간대별 통계 맵 초기화
        Map<String, Integer> timeStats = new HashMap<>();
        // 초기값 설정
        timeStats.put("TenAM", 0);
        timeStats.put("TwelvePM", 0);
        timeStats.put("TwoPM", 0);
        timeStats.put("FourPM", 0);
        timeStats.put("SixPM", 0);
        timeStats.put("EightPM", 0);
        timeStats.put("TenPM", 0);
        // 팝업 ID 혹은 기업ID를 통해서 모든 방문자 리스트 가져오기
        List<Visit> visitors;
        if (isCompany) {
        	Exhibition exhi = exhibitionRepository.findById(exId).orElseThrow(() -> new IllegalArgumentException("찾는 팝업/전시가 없습니다."));
            visitors = visitRepository.findAllByCompanyId(exhi.getUser().getCompId()); // 기업 ID로 방문자 리스트 가져오기
        } else {
        	visitors = visitRepository.findAllByExhibitionId(exId);
        }
        for (Visit visit : visitors) {
            int timeZone = visit.getTimeZone(); // 사용자의 시간대 가져오기
            // 시간대에 따라 통계 업데이트
            switch (timeZone) {
                case 1: timeStats.put("TenAM", timeStats.get("TenAM") + 1); break;
                case 2: timeStats.put("TwelvePM", timeStats.get("TwelvePM") + 1); break;
                case 3: timeStats.put("TwoPM", timeStats.get("TwoPM") + 1); break;
                case 4: timeStats.put("FourPM", timeStats.get("FourPM") + 1); break;
                case 5: timeStats.put("SixPM", timeStats.get("SixPM") + 1); break;
                case 6: timeStats.put("EightPM", timeStats.get("EightPM") + 1); break;
                case 7: timeStats.put("TenPM", timeStats.get("TenPM") + 1); break;
            }
        }
        
        return StatsResponse.builder()
        		.stats(timeStats)
        		.build();
	}


    public boolean getVisitState(Long exId, User user) {
        return visitRepository.existsByExhibitionIdAndUserId(exId, user.getId());
    }
}
