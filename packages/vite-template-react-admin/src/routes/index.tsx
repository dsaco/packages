/* eslint-disable react-refresh/only-export-components */
import React, { lazy } from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';
import { message } from 'antd';
import {
  DashboardOutlined,
  DatabaseOutlined,
  UserOutlined,
  WarningOutlined,
  ReadOutlined,
} from '@ant-design/icons';

import Layout from '@/layouts/Layout';

import Login from '@/pages/Login';

import UnexpectedError from '@/pages/ErrorPage/UnexpectedError';
import NotFound from '@/pages/ErrorPage/404';
import Forbidden from '@/pages/ErrorPage/403';
import ServerError from '@/pages/ErrorPage/500';
import { useAuthStore } from '@/stores/authStore';

const UserList = lazy(() => import('@/pages/Users'));
const UserDetail = lazy(() => import('@/pages/Users/UserDetail'));
const NoteList = lazy(() => import('@/pages/Notes'));

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
      {
        key: '/notes',
        label: '文章管理',
        icon: <ReadOutlined />,
        path: '/notes',
        element: <NoteList />,
      },
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
    errorElement: <UnexpectedError />,
    children: [
      ...routesAndMenus,
      {
        path: '*',
        element: <NotFound />,
      },
    ],
    loader: async () => {
      let { userinfo } = useAuthStore.getState();
      const { getUserinfo } = useAuthStore.getState();

      if (!userinfo) {
        userinfo = await getUserinfo();
      }
      if (!userinfo) {
        return redirect('/login');
      }
      if (Number(userinfo.role) < 3) {
        message.warning('权限不足，请尝试其他账号');
        return redirect('/login');
      }
      return null;
    },
  },
  {
    path: '/login',
    element: <Login />,
  },
]);
