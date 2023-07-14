import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';

import type { ButtonProps } from '.';
import { Color, TypeColor } from '../utils/color';

type ButtonAntProps = ButtonProps & {
  loading?: boolean;
  shape?: 'default' | 'circle' | 'round';
  size?: 'large' | 'middle' | 'small';
};

const StyledButtonAnt = styled.button`
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  height: 32px;
  padding: 4px 15px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5714;
  color: rgb(0 0 0 / 88%);
  text-align: center;
  white-space: nowrap;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  background-color: transparent;
  background-color: #fff;
  background-image: none;
  border: 1px solid transparent;
  border-color: #d9d9d9;
  border-radius: 6px;
  outline: none;
  box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const StyledWave = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 6px;
  box-shadow: 0 0 0 0 #1677ff;
  opacity: 0.2;
  transition: box-shadow 0.4s cubic-bezier(0.08, 0.82, 0.17, 1),
    opacity 2s cubic-bezier(0.08, 0.82, 0.17, 1);

  &:hover {
    box-shadow: 0 0 0 6px #1677ff;
    opacity: 0;
  }
`;

export const ButtonAnt: React.FC<ButtonAntProps> = ({ children }) => {
  return (
    <StyledButtonAnt>
      {children}
      <StyledWave></StyledWave>
    </StyledButtonAnt>
  );
};
