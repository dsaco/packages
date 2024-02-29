import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { IUserinfo } from '@/apis/auth';
import { request } from '@/utils';

interface IAuthState {
  userinfo?: IUserinfo | null;
  setUserinfo: (data?: IUserinfo) => void;
  getUserinfo: () => Promise<IUserinfo | null>;
  logout: () => Promise<unknown>;
}

export const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      userinfo: null,
      setUserinfo: (data) => {
        set({ userinfo: data });
      },
      getUserinfo: async () => {
        const data = await request.get<IUserinfo | null>('/api/auth/userinfo');

        set({ userinfo: data });

        return data;
      },
      logout: async () => {
        return request.get('/api/auth/logout').finally(() => {
          set({ userinfo: null });
        });
      },
    }),
    {
      name: 'userinfo',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
