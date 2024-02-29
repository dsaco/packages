import { createBrowserRouter } from 'react-router-dom';

import UnexpectedError from '@/pages/ErrorPage/UnexpectedError';
import NotFound from '@/pages/ErrorPage/404';

import Home from '@/pages/Home';
import About from '@/pages/About';

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <UnexpectedError />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/404',
        element: <NotFound />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
