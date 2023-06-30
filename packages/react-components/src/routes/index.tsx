import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from '@/pages/App';
import DotPage from '@/pages/Dot';
const NotFound = lazy(() => import('@/pages/NotFound'));
const Home = lazy(() => import('@/pages/Home'));

const RipplePage = lazy(() => import('@/pages/RipplePage'));
const ImgPage = lazy(() => import('@/pages/ImgPage'));
const PaginationPage = lazy(() => import('@/pages/PaginationPage'));
const ModalPage = lazy(() => import('@/pages/ModalPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'ripple',
        element: <RipplePage />,
      },
      {
        path: 'img',
        element: <ImgPage />,
      },
      {
        path: 'pagination',
        element: <PaginationPage />,
      },
      {
        path: 'modal',
        element: <ModalPage />,
      },
      {
        path: 'dot',
        element: <DotPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
