import api from "../api";

export const authAPI = {
  create : (data) => api.post("/auth/create", data),
  update : (data) => api.patch(`/auth/update`, data),
  delete : () => api.patch(`/auth/delete`),
  duplicateEmail : (email) => api.get(`/auth/email?email=${email}`),
  duplicateNickname : (nickname) => api.get(`/auth/nickname?nickname=${nickname}`),
  // login : (data) =>api.post("/auth/login", data)
  login : (data) => api.post("/auth/login", data),
  getUser : (id) => api.get(`/auth/${id}`),
  checkPassword: (data) => api.post("/auth/check-password", data)
}