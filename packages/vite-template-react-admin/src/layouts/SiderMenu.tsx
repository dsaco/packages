import { useEffect, useState } from 'react';
import { useNavigate, matchPath } from 'react-router-dom';
import { Menu } from 'antd';

import { routesAndMenus, RouteAndMenu } from '@/routes';

export default function SiderMenu() {
  const navigate = useNavigate();

  const [menus, setMenus] = useState<RouteAndMenu[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    const recur = (items: RouteAndMenu[], prev: string[] = []) => {
      const temp = [];
      for (const item of items) {
        if (!item.hideInMenu) {
          if (Array.isArray(item.children)) {
            item.children = recur(item.children, [...prev, item.key]);
          }

          temp.push(item);
        }
        if (item.path && item.path !== '*') {
          const m = matchPath(item.path, location.pathname);
          if (m?.pattern) {
            setSelectedKeys([item.key]);
            setOpenKeys(prev);
          }
        }
      }

      if (temp.length) {
        return temp;
      }
    };

    const menus = recur(routesAndMenus);

    setMenus(menus!);
  }, []);

  return (
    <Menu
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      mode="inline"
      items={menus}
      onOpenChange={setOpenKeys}
      onClick={({ key }) => {
        setSelectedKeys([key]);
        navigate(key);
      }}
    />
  );
}
