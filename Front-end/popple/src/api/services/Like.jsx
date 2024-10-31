import api from "../api";

export const likeAPI = {
   
    getMyLikeList: () => api.get("/like"),
    pressLike: (exId) => api.post(`/like/${exId}`),
    unlike: (exId) => api.delete(`/like/${exId}`),
    howManyLikes: (exId) => api.get(`/like/${exId}`),
    amILiked: (exId) => api.get(`/like/me/${exId}`)
  };
  