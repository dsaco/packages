/* eslint-disable react-refresh/only-export-components */
import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import {
  DashboardOutlined,
  DatabaseOutlined,
  UserOutlined,
  WarningOutlined,
} from '@ant-design/icons';

import Layout from '@/layouts/Layout';

import NotFound from '@/pages/ErrorPage/404';
import Forbidden from '@/pages/ErrorPage/403';
import ServerError from '@/pages/ErrorPage/500';

// import Page2 from '@/pages/Page2';
// const Page1 = lazy(() => import('@/pages/Page1'));

const UserList = lazy(() => import('@/pages/Users'));
const UserDetail = lazy(() => import('@/pages/Users/UserDetail'));
// const GoodList = lazy(() => import('@/pages/Goods'));

export interface RouteAndMenu {
  key: string;
  icon?: JSX.Element;
  label?: string;
  path?: string;
  element?: React.ReactNode;
  hideInMenu?: boolean;
  children?: RouteAndMenu[];
}

export const routesAndMenus: RouteAndMenu[] = [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: '仪表盘',
    // children: [
    //   {
    //     key: '/page1',
    //     label: '分析页',
    //     path: '/page1',
    //     element: <Page1 />,
    //   },
    //   {
    //     key: '/page2',
    //     label: '监控页',
    //     path: '/page2',
    //     element: <Page2 />,
    //   },
    //   {
    //     key: '/page3',
    //     label: '工作台',
    //     path: '/page3',
    //     element: <Page1 />,
    //   },
    // ],
  },
  {
    key: 'data',
    icon: <DatabaseOutlined />,
    label: '数据管理',
    children: [
      {
        key: '/users',
        label: '用户管理',
        icon: <UserOutlined />,
        path: '/users',
        element: <UserList />,
      },
      {
        key: '/users',
        path: '/users/:id',
        element: <UserDetail />,
        hideInMenu: true,
      },
      //   {
      //     key: '/goods',
      //     label: '商品管理',
      //     icon: <ShoppingOutlined />,
      //     path: '/goods',
      //     element: <GoodList />,
      //   },
    ],
  },
  {
    key: 'error',
    icon: <WarningOutlined />,
    label: '异常页',
    children: [
      {
        key: '/403',
        label: '403',
        path: '/403',
        element: <Forbidden />,
      },
      {
        key: '/404',
        label: '404',
        path: '/404',
        element: <NotFound />,
      },
      {
        key: '/500',
        label: '500',
        path: '/500',
        element: <ServerError />,
      },
    ],
  },
];

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      ...routesAndMenus,
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
