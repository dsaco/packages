import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ConfigProvider, Layout as AntLayout } from 'antd';

import { HEADER_HEIGHT, SIDER_WIDTH } from '@/constant';

import Header from './Header';
import Background from './Background';
import SiderMenu from './SiderMenu';
import CollapseBtn from './CollapseBtn';

export default function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Header />
      <Background />
      <AntLayout style={{ backgroundColor: 'transparent' }}>
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
          <AntLayout.Sider
            width={SIDER_WIDTH}
            style={{ backgroundColor: 'transparent' }}
            trigger={null}
            collapsible
            collapsed={collapsed}
          />
          <AntLayout.Sider
            width={SIDER_WIDTH}
            style={{
              height: `calc(100% - ${HEADER_HEIGHT}px)`,
              insetBlockStart: HEADER_HEIGHT,
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
            <CollapseBtn collapsed={collapsed} setCollapsed={setCollapsed} />
          </AntLayout.Sider>
        </ConfigProvider>
        <AntLayout style={{ backgroundColor: 'transparent' }}>
          <AntLayout.Content style={{ paddingBlock: 32, paddingInline: 40 }}>
            <div style={{ height: HEADER_HEIGHT }}></div>
            <Outlet />
          </AntLayout.Content>
        </AntLayout>
      </AntLayout>
    </>
  );
}
