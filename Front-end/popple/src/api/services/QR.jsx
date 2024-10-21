import api from "../api";

export const qrAPI = {
  getQR : (data) => api.get(`/exhibition/qr-code?link=${data}`, { responseType: 'blob' }),
}