import { lazy } from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';

import Layout from '@/components/Layout';
import Login from '@/pages/Login';
import { useUserStore } from '@/stores/userStore';

const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    loader: async () => {
      const { userinfo } = useUserStore.getState();
      if (!userinfo) {
        return redirect('/login');
      }
      return null;
    },
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);
