import axios from "axios";
import { getCookie, removeCookie, setCookie } from "../utils/CookieUtils";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_REST_SERVER}`,
  withCredentials: true
});
api.interceptors.request.use(
  (config) => {
    const token = getCookie("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    // 403 으로 실패한 요청
    const originalReq = err.config;
    // 만약 권한이 없다는 에러와 함께 무한루프에 빠진다면
    if (err.response.status == 403 && !originalReq._retry) {
      originalReq._retry = true; // 플레그 설정
      try {
        // 토큰 재발급
        const response = await refreshTokenHandler();
        // 재발급 성공 시
        if (response.status === 200) {
          // token값 로컬스토리지 저장
          // localStorage.setItem("token", response.data.accessToken);
          // token값 쿠키에 저장
          setCookie("accessToken", response.data.accessToken);
          // 헤더이 새 Token 추가
          originalReq.headers.Authorization = `Bearer ${response.data.accessToken}`;
          // 실패했던 요청 다시 시도
          return api.request(originalReq);
        }
      } catch (err) {
        console.log("토큰 재발급 실패");
        return Promise.reject(err);
      }
    }
    removeCookie("accessToken");
    return Promise.reject(err);
  }
);

const refreshTokenHandler = async () => {
  try {
    if (getCookie("accessToken")) {
      const response = await api.post("/auth/refresh-token");
      return response;
    }
  } catch (err) {
    console.error("토큰 갱신 실패:", err);
    throw err; // 에러를 다시 던져서 호출하는 쪽에서 처리하도록 함
  }
};

export default api;