import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from '@/pages/App';
import DotPage from '@/pages/Dot';
const NotFound = lazy(() => import('@/pages/NotFound'));
const Home = lazy(() => import('@/pages/Home'));
const UtilPage = lazy(() => import('@/pages/UtilPage'));

const RipplePage = lazy(() => import('@/pages/RipplePage'));
const ImgPage = lazy(() => import('@/pages/ImgPage'));
const PaginationPage = lazy(() => import('@/pages/PaginationPage'));
const ModalPage = lazy(() => import('@/pages/ModalPage'));
const SwitchPage = lazy(() => import('@/pages/SwitchPage'));
const ButtonPage = lazy(() => import('@/pages/ButtonPage'));
const LoadingPage = lazy(() => import('@/pages/LoadingPage'));
const MasonryPage = lazy(() => import('@/pages/MasonryPage'));

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
        path: 'util',
        element: <UtilPage />,
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
        path: 'switch',
        element: <SwitchPage />,
      },
      {
        path: 'button',
        element: <ButtonPage />,
      },
      {
        path: 'dot',
        element: <DotPage />,
      },
      {
        path: 'loading',
        element: <LoadingPage />,
      },
      {
        path: 'masonry',
        element: <MasonryPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
