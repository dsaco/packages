import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      userinfo: undefined,
      getUserinfo: async (data) => {
        set({ userinfo: data });
      },
    }),
    {
      name: 'userinfo',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
