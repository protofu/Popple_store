import api from "../api"; // api 인스턴스 가져오기

export const visitAPI = {
  // 방문 체크
  visitCheck: (data) => api.post(`/review`, data),

  // 아래는 팝업/전시 기준입니다.

  // 요일 기준 방문 통계
  weekStatistic: (id) => api.get(`/visit/week/${id}`),
  // 성별 기준 방문 통계
  genderStatistic: (id) => api.get(`/visit/gender/${id}`),
  // 나이별 기준 방문 통계
  ageStatistic: (id) => api.get(`/visit/age/${id}`),
  // 시간대별 기준 방문 통계
  timeStatistic: (id) => api.get(`/visit/time/${id}`),


  // 아래는 기업 기준입니다.

  // 요일 기준 방문 통계
  weekCompStatistic: (id) => api.get(`/visit/week-comp/${id}`),
  // 성별 기준 방문 통계
  genderCompStatistic: (id) => api.get(`/visit/gender-comp/${id}`),
  // 나이별 기준 방문 통계
  ageCompStatistic: (id) => api.get(`/visit/age-comp/${id}`),
  // 시간대별 기준 방문 통계
  timeCompStatistic: (id) => api.get(`/visit/time-comp/${id}`),

};
  