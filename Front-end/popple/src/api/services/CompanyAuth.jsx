import api from "../api";

export const CompanyAuthAPI = {
  create : (data) => api.post("/company/create", data),
  update : (data) => api.patch(`/company/update/${id}`, data),
  delete : () => api.patch(`/company/delete/${id}`),
  get : () => api.get(`/company/${id}`)
}