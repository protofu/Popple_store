import api from "../api";

export const authAPI = {
  create : (data) => api.post("/auth/create", data),
  update : (id, data) => api.patch(`/auth/update/${id}`, data),
  delete : (id) => api.patch(`/auth/delete/${id}`),
  duplicateEmail : (email) => api.get(`/auth/email?email=${email}`),
  duplicateNickname : (nickname) => api.get(`/auth/nickname?nickname=${nickname}`),
  // login : (data) =>api.post("/auth/login", data)
  login : (data) => api.post("/auth/login", data)
}