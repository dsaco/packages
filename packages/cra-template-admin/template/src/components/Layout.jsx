import { createElement, useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { useUserStore } from '@/stores/userStore';

function _Header({ collapsed, setCollapsed }) {
  const navigate = useNavigate();
  const userinfo = useUserStore((state) => state.userinfo);
  const logout = useUserStore((state) => state.logout);

  const onLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <>
      <div
        className="h-full p-4"
        style={{ width: collapsed ? 80 : 200, transition: 'width 0.3s' }}
      >
        <Link to="/">
          <div className="bg-white opacity-30 h-full"></div>
        </Link>
      </div>
      <div className="flex-1 flex justify-between items-center p-4 pl-0">
        <span>
          {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            style: {
              fontSize: 18,
              color: '#fff',
              cursor: 'pointer',
              paddingLeft: 8,
            },
            onClick: () => setCollapsed((prev) => !prev),
          })}
        </span>
        <Dropdown
          menu={{
            items: [
              {
                key: 0,
                label: <a onClick={onLogout}>退出登录</a>,
                icon: <PoweroffOutlined />,
              },
            ],
          }}
        >
          <div className="cursor-pointer">
            <Avatar icon={<UserOutlined />} />
            <span className="text-white pl-2">{userinfo?.username}</span>
          </div>
        </Dropdown>
      </div>
    </>
  );
}

export default function _Layout() {
  const navigate = useNavigate();
  const onMenuClick = (e) => {
    navigate(e.key);
  };

  const [collapsed, setCollapsed] = useState(false);

  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState([]);
  useEffect(() => {
    setSelectedKeys(location?.pathname);
  }, []);

  return (
    <Layout className="h-screen">
      <Layout.Header className="bg-slate-800 flex p-0">
        <_Header collapsed={collapsed} setCollapsed={setCollapsed} />
      </Layout.Header>
      <Layout>
        <Layout.Sider
          width={200}
          className="overflow-y-auto"
          style={{ backgroundColor: '#fff' }}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <Menu
            theme="light"
            items={[
              {
                key: '/about',
                label: '关于',
              },
              {
                key: '/contact',
                label: '联系',
              },
            ]}
            onClick={onMenuClick}
            selectedKeys={selectedKeys}
            onSelect={({ selectedKeys }) => setSelectedKeys(selectedKeys)}
          />
        </Layout.Sider>
        <Layout.Content>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
