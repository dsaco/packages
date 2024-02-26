import styled from '@emotion/styled';
import { Avatar } from 'antd';

import logo from '@/assets/logo.svg';
import { HEADER_HEIGHT } from '@/constant';

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

export default function Header() {
  return (
    <StyledHeader>
      <div className="flex items-center">
        <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
        <img src={logo} className="ml-2" alt="" />
      </div>
      <div></div>
    </StyledHeader>
  );
}
