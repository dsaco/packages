import styled from '@emotion/styled';
import { Avatar, Dropdown } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';

import logo from '@/assets/logo.svg';
import { HEADER_HEIGHT } from '@/constant';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate } from 'react-router-dom';

const StyledHeader = styled.header`
  position: fixed;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  padding-inline: 16px;
  background-color: rgb(255 255 255 / 60%);
  backdrop-filter: blur(8px);
  border-block-end: 1px solid rgb(5 5 5 / 6%);
`;

const StyledItem = styled.div`
  padding: 6px;
  cursor: pointer;

  &:hover {
    background-color: rgb(0 0 0 / 3%);
    border-radius: 6px;
  }
`;

export default function Header() {
  const navigate = useNavigate();
  const userinfo = useAuthStore((state) => state.userinfo);
  const logout = useAuthStore((state) => state.logout);

  return (
    <StyledHeader>
      <div className="flex items-center">
        <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
        <img src={logo} className="ml-2" alt="" />
      </div>
      <div>
        <Dropdown
          menu={{
            items: [
              {
                key: 'logout',
                label: (
                  <a
                    className="flex items-center"
                    onClick={() => {
                      logout().finally(() => {
                        navigate('/login');
                      });
                    }}
                  >
                    <PoweroffOutlined /> <span className="ml-2">退出登录</span>
                  </a>
                ),
              },
            ],
          }}
          placement="bottomRight"
        >
          <StyledItem>
            <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
            <span className="text-xs ml-2">{userinfo?.name}</span>
          </StyledItem>
        </Dropdown>
      </div>
    </StyledHeader>
  );
}
