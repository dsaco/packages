import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';

import '@/styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <React.Suspense fallback={<span>...</span>}>
    <RouterProvider router={router} />
  </React.Suspense>,
  // </React.StrictMode>
);
