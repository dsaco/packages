import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { router } from '@/routes';

import '@/styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ConfigProvider locale={zhCN}>
    <React.Suspense fallback={<span>...</span>}>
      <RouterProvider router={router} />
    </React.Suspense>
  </ConfigProvider>,
  // </React.StrictMode>
);
