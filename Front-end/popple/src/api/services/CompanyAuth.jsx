import api from "../api";

export const companyAuthAPI = {
  create : (data) => api.post("/company/create", data),
  update : (id, data) => api.patch(`/company/update/${id}`, data),
  delete : (id, data) => api.patch(`/company/delete/${id}`,data),
  get : (id) => api.get(`/company/${id}`)
}