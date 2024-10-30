import api from "../api"; // api 인스턴스 가져오기

export const reviewAPI = {
    // 리뷰 작성
    writeReview: (data) => api.post(`/review`, data),
    // 리뷰 목록
    getReviewList: (id) => api.get(`/review/${id}`),
    // 나의 리뷰 목록
    getMyReviewList: () => api.get(`/review/my`),
    // 나의 리뷰 삭제
    deleteReview: (id) => api.delete(`/review/${id}`),
    // 나의 리뷰 수정
    modifyReview: (id, data) => api.patch(`/review/${id}`, data),
  };
  