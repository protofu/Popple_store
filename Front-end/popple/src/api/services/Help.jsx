import api from "../api"; // api 인스턴스 가져오기

export const helpAPI = {
   
    gethelp: () => api.get("/help"),
    gethelplist: (id) => api.get(`/help/detail?id=${id}`),
    createHelp: (data) => api.post("/help/create", data),
    delete:(id) =>api.delete(`/help/delete?id=${id}`)
  };
  