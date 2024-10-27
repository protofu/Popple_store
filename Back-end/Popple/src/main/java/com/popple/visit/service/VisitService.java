package com.popple.visit.service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.popple.auth.entity.User;
import com.popple.auth.repository.UserRepository;
import com.popple.company.entity.Company;
import com.popple.company.repository.CompanyRepository;
import com.popple.exhibition.entity.Exhibition;
import com.popple.exhibition.repository.ExhibitionRepository;
import com.popple.visit.domain.CheckResponse;
import com.popple.visit.domain.WeekResponse;
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
	
	public CheckResponse insert(Long exId, User user) {
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

    // 팝업/전시 기준
    
    // 요일 통계
    public WeekResponse getWeekStatistic(Long exId) {
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
        // 팝업 ID를 통해서 모든 방문자 리스트 가져오기
        List<Visit> visitors = visitRepository.findAllByExhibitionId(exId);
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
        return WeekResponse.builder()
                .exId(exId)
                .weekStats(weekStats)
                .build();
    }


}
