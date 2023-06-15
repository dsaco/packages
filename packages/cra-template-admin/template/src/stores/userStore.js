import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      userinfo: undefined,
      setUser: async (data) => {
        set({ userinfo: data });
      },
      logout: async () => {
        set({ userinfo: undefined });
      },
    }),
    {
      name: 'userinfo',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
