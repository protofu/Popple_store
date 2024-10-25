import api from "../api";

export const exhibitionAPI = {
  regist : (data) => api.post("exhibition/resist", data),
  update : (data) => api.patch("exhibition",data),
  delete : (data) => api.patch("/exhibition/delete", data),
  getlist : () => api.get("exhibition"),
  get : (id) => api.get(`exhibition${id}`),
  my : (data) => api.get("exhibition/my-exhibition",data)
}