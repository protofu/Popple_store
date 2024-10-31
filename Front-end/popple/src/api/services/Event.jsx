import api from "../api";

export const eventAPI = {
  regist : (data) => api.post("/event", data),
  getAll :  () => api.get("/event"),
  getEvent : (id) => api.get(`/event/${id}`),
  getExhibitionEvents: (id) => api.get(`/event/pop/${id}`),
  delete : (data) => api.delete(`/event/delete/${data}`),
  update : (data) => api.patch("/event/update",data),
  isMine : (data) => api.get("/event/is", data)
}