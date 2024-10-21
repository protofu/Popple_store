import api from "../api";

export const authAPI = {
  create : (data) => api.post("/auth/create", data),
  update : (data) => api.patch(`/auth/update/${id}`, data),
  delete : () => api.patch(`/auth/delete/${id}`),
  duplicateEmail : (email) => api.get("/auth/email",{params:email}),
  duplicateNickname : (nickname) => api.get(`/auth/nickname`,{params:nickname})
}