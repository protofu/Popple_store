import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLoginUserStore = create(
  persist(
    (set) => ({
      loginUserName: null,
      loginUserNickname: null,
      loginUserRole: null,
      setLoginUser: (name, nickname, role) => set({ loginUserName: name, loginUserNickname: nickname, loginUserRole: role })
    }),
    {
      name: 'login user state',
    }
  )
);