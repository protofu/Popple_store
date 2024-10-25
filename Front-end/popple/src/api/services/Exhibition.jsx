import api from "../api";

export const ExhibitionAPI = {
  regist : (data) => api.post("exhibition/resist", data),
  update : (data) => api.patch("exhibition",data),
}