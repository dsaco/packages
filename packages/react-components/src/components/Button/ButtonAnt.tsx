import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { Color, IColor } from '@dsaco/utils';

import { Wave } from '../Wave';

export type ButtonAntProps = React.HTMLProps<HTMLButtonElement> & {
  as?: React.ElementType<any>;
  htmlType?: 'submit' | 'reset' | 'button';
  // loading?: boolean;
  // shape?: 'default' | 'circle' | 'round';
  // size?: 'large' | 'middle' | 'small';
  type?: 'outline' | 'filled' | 'dashed' | 'text' | 'link';
  ghost?: boolean;
  color?: 'primary' | 'danger' | string;
  round?: boolean;
};

type TypeStyledButtonAntProps = {
  $type?: 'outline' | 'filled' | 'dashed' | 'text' | 'link';
  $ghost?: boolean;
  $color: IColor;
  $round?: boolean;
};
const getCss = ({ $ghost, $type, $color }: TypeStyledButtonAntProps) => {
  const themeColor = $color.rgb;
  const themeLight = $color.alpha(0.8);
  const themeDeep = $color.darken(0.1);

  let color;
  let borderStyle = 'solid';
  let borderColor = 'transparent';
  let bg = 'transparent';

  let hoverColor = '';
  let hoverBorderColor = '';
  let hoverBg = '';

  let activeColor = '';
  let activeBorderColor = '';
  let activeBg = '';

  switch ($type) {
    case 'outline':
      color = themeColor;
      borderColor = themeColor;
      bg = $ghost ? 'transparent' : '#fff';
      hoverColor = themeLight;
      hoverBorderColor = themeLight;
      activeColor = themeDeep;
      activeBorderColor = themeDeep;
      break;
    case 'filled':
      color = '#fff';
      borderColor = themeColor;
      bg = themeColor;
      hoverBg = themeLight;
      hoverBorderColor = themeLight;
      activeBg = themeDeep;
      activeBorderColor = themeDeep;
      break;
    case 'link':
      color = themeColor;
      hoverColor = themeLight;
      activeColor = themeDeep;
      break;
    case 'text':
      color = themeColor;
      hoverColor = themeLight;
      hoverBg = $color.alpha(0.1);
      activeColor = themeDeep;
      break;
    case 'dashed':
      color = themeColor;
      borderColor = themeColor;
      borderStyle = 'dashed';
      bg = $ghost ? 'transparent' : '#fff';
      hoverColor = themeLight;
      hoverBorderColor = themeLight;
      activeColor = themeDeep;
      activeBorderColor = themeDeep;
      break;
    default:
      color = $ghost ? '#fff' : 'rgb(0 0 0 / 88%)';
      borderColor = $ghost ? '#fff' : '#d9d9d9';
      bg = $ghost ? 'transparent' : '#fff';
      hoverColor = themeLight;
      hoverBorderColor = themeLight;
      activeColor = themeDeep;
      activeBorderColor = themeDeep;
      break;
  }

  return `
    color: ${color};
    border: 1px ${borderStyle} ${borderColor};
    background-color: ${bg};
    &:hover:not(:disabled) {
      ${hoverColor ? `color: ${hoverColor};` : ''}
      ${hoverBorderColor ? `border-color: ${hoverBorderColor};` : ''}
      ${hoverBg ? `background-color: ${hoverBg}` : ''}
    }
    &:active:not(:disabled) {
      ${activeColor ? `color: ${activeColor};` : ''}
      ${activeBorderColor ? `border-color: ${activeBorderColor};` : ''}
      ${activeBg ? `background-color: ${activeBg}` : ''}
    }
    &:disabled {
      cursor: not-allowed; 
      color: rgb(0 0 0 / 25%);
      border-color: ${
        borderColor === 'transparent' ? 'transparent' : '#d9d9d9'
      };
      background-color: ${
        bg === 'transparent' ? 'transparent' : 'rgb(0 0 0 / 4%)'
      };
    }
  `;
};

const StyledButtonAnt = styled.button<TypeStyledButtonAntProps>`
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  height: 32px;
  padding: 4px 15px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5714;
  text-align: center;
  white-space: nowrap;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  border-radius: ${({ $round }) => ($round ? '999px' : '6px')};
  outline: none;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  ${getCss}
`;

export const ButtonAnt: React.FC<ButtonAntProps> = ({
  htmlType = 'button',
  type,
  color = 'primary',
  ghost,
  round,
  children,
  ...restProps
}) => {
  const $color = useMemo(() => {
    if (color === 'primary') {
      return Color('#1677ff');
    }
    if (color === 'danger') {
      return Color('#ff4d4f');
    }
    return Color(color);
  }, [color]);
  return (
    <StyledButtonAnt
      type={htmlType}
      $type={type}
      $ghost={ghost}
      $color={$color}
      $round={round}
      {...restProps}
    >
      {children}
      {type !== 'link' && type !== 'text' && (
        <Wave color={$color.hex} borderRadius={round ? 999 : 6} />
      )}
    </StyledButtonAnt>
  );
};
