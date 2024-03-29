import React, { createElement } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import { SIDER_WIDTH, HEADER_HEIGHT } from '@/constant';

const StyledCollapseBtn = styled.div<{ collapsed: boolean }>`
  position: fixed;
  top: ${HEADER_HEIGHT + 16}px;
  left: ${({ collapsed }) => (collapsed ? 68 : SIDER_WIDTH - 12)}px;
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

interface ICollapseBtnProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const CollapseBtn: React.FC<ICollapseBtnProps> = ({
  collapsed,
  setCollapsed,
}) => {
  return (
    <StyledCollapseBtn
      collapsed={collapsed}
      onClick={() => setCollapsed((prev) => !prev)}
    >
      {createElement(collapsed ? RightOutlined : LeftOutlined, {
        style: {
          color: 'rgb(0 0 0 / 50%)',
          fontSize: 12,
        },
      })}
    </StyledCollapseBtn>
  );
};

export default CollapseBtn;
