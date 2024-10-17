import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLoginUserStore = create(
  persist(
    (set) => ({
      loginUserName: null,
      loginUserNickname: null,
      setLoginUser: (name, nickname) => set({ loginUserName: name, loginUserNickname: nickname })
    }),
    {
      name: 'login user state',
    }
  )
);