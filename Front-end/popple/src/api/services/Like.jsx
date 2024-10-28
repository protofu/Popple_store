import api from "../api";

export const likeAPI = {
   
    getMyLikeList: () => api.get("/like"),
    pressLike: (id) => api.post(`/like/${id}`),
    unlike: (id) => api.delete(`/like/${id}`),
    howManyLikes: (id) => api.get(`/help/${id}`),
  };
  