import api from "../api"; // api 인스턴스 가져오기

export const reviewAPI = {
    // 리뷰 작성
    writeReview: (data) => api.post(`/review`, data),
    // 리뷰 목록
    getReviewList: (id) => api.get(`/review/${id}`),
  };
  