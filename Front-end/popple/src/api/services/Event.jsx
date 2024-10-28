import api from "../api";

export const eventAPI = {
  regist : (data) => api.post("/exhibition/event", data),
  
}