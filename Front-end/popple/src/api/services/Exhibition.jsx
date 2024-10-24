import api from "../api";

export const ExhibitionAPI = {
  regist : (iamges, posters, token, data) => api.post("/exhibition/regist")
 
}