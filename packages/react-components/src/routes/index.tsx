import App from '@/pages/App';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const NotFound = lazy(() => import('@/pages/NotFound'));
const Home = lazy(() => import('@/pages/Home'));
const RipplePage = lazy(() => import('@/pages/RipplePage'));

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
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
