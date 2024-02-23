import { useState, createElement } from 'react';
import { Outlet } from 'react-router-dom';
import { ConfigProvider, Layout } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import Header from '@/components/Layouts/Header';
import SiderMenu from '@/components/Layouts/SiderMenu';

const StyledBackground = styled.div`
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: linear-gradient(#fff, #f5f5f5 28%);
`;
const StyledToggleCollapse = styled.div<{ collapsed: boolean }>`
  position: fixed;
  top: 72px;
  left: ${({ collapsed }) => (collapsed ? 68 : 244)}px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
  background-color: #fff;
  border-radius: 50%;
  box-shadow:
    0 2px 8px -2px rgb(0 0 0 / 20%),
    0 1px 4px -1px rgb(25 15 15 / 7%),
    0 0 1px 0 rgb(0 0 0 / 10%);
  transition: all 0.2s;
`;

export default function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Header />
      <StyledBackground />
      <Layout style={{ backgroundColor: 'transparent' }}>
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: 'transparent',
              colorFillAlter: 'transparent',
              colorSplit: 'transparent',
              colorPrimary: 'rgba(0, 0, 0, 0.95)',
            },
            components: {
              Menu: {
                itemSelectedBg: 'rgb(0 0 0 / 6%)',
                itemActiveBg: 'rgb(0 0 0 / 18%)',
              },
            },
          }}
        >
          <Layout.Sider
            width={256}
            style={{ backgroundColor: 'transparent' }}
            trigger={null}
            collapsible
            collapsed={collapsed}
          />
          <Layout.Sider
            width={256}
            style={{
              height: 'calc(100% - 56px)',
              insetBlockStart: 56,
              position: 'fixed',
              overflowY: 'auto',
              backgroundColor: 'transparent',
              borderRight: '1px solid rgb(0 0 0 / 6%)',
              paddingInlineStart: 4,
              paddingInlineEnd: 8,
            }}
            trigger={null}
            collapsible
            collapsed={collapsed}
          >
            <SiderMenu />
            <StyledToggleCollapse
              collapsed={collapsed}
              onClick={() => setCollapsed((prev) => !prev)}
            >
              {createElement(collapsed ? RightOutlined : LeftOutlined, {
                style: {
                  color: 'rgb(0 0 0 / 50%)',
                  fontSize: 12,
                },
              })}
            </StyledToggleCollapse>
          </Layout.Sider>
        </ConfigProvider>
        <Layout style={{ backgroundColor: 'transparent' }}>
          <div style={{ height: 56 }}></div>
          <Layout.Content style={{ paddingBlock: 32, paddingInline: 40 }}>
            <Outlet />
          </Layout.Content>
        </Layout>
      </Layout>
    </>
  );
}
