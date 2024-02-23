import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { router } from '@/routes';

import reportWebVitals from './reportWebVitals';

import '@/styles/index.css';

createRoot(document.querySelector('#root')!).render(
  // <React.StrictMode>
  <ConfigProvider locale={zhCN}>
    <React.Suspense fallback={<span>...</span>}>
      <RouterProvider router={router} />
    </React.Suspense>
  </ConfigProvider>,
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
