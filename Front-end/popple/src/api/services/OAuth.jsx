import api from "../api";

export const oauthAPI = {
  signUp : (provider, code) => api.get(`/oauth/${provider}?code=${code}`),
  login : (data) => api.post(`/oauth/login`, data),
};
