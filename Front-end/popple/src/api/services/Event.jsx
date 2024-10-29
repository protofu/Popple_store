import api from "../api";

export const eventAPI = {
  regist : (data) => api.post("/event", data),
  getAll :  () => api.get("/event"),
  getEvent : (id) => api.get(`/event/${id}`),
  delete : (data) => api.delete("/event/delete",data),
  update : (data) => api.patch("/event/update",data)
}