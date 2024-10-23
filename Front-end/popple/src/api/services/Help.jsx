import api from "../api"; // api 인스턴스 가져오기

export const helpAPI = {
    // FAQ 목록 요청
    fetchFAQs: () => api.get("/help"),
  
    // 특정 FAQ 요청 (상세보기)
    fetchFAQById: (id) => api.get(`/help/detail?id=${id}`),
  };
  