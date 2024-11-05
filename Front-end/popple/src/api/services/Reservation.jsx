import api from "../api";

export const reservationAPI = {
  create : (data) => api.post("/reservation", data, { responseType: 'arraybuffer' }),
  getList : () => api.get(`/reservation`),
  getReserverList : (id) => api.get(`/reservation/reserver-list/${id}`),
  cancel : (id) => api.patch(`/reservation/cancel/${id}`),
  check : (id) => api.patch(`/reservation/check/${id}`),
  checkMyReservation : (id) => api.get(`/reservation/check/${id}`),
}