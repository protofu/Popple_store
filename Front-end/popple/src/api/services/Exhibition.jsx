import api from "../api";

export const exhibitionAPI = {
  regist : (data) => api.post("exhibition/resist", data),
  update : (data) => api.patch("exhibition",data),
}