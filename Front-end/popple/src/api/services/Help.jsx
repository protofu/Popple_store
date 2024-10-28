import api from "../api"; // api 인스턴스 가져오기

export const helpAPI = {
   
    gethelplist: () => api.get("/help"),
    gethelp: (id) => api.get(`/help/${id}`),
    createHelp: (data) => api.post("/help", data),
    delete:(id) => api.delete(`/help/${id}`),
    answer:(data) => api.patch(`/help`, data),
    
  };
  