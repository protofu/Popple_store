import api from "../api";

export const eventAPI = {
  regist : (data) => api.post("/event", data),
  
}