import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLoginStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      setIsLoggedIn: (value) => set({ isLoggedIn: value })
    }),
    {
      name: 'login state',
    }
  )
);