import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';

import { darken, colorAlpha } from '../common/utils';
import Ripple from '../Ripple';

import type { ButtonProps } from '.';

type TypeVariant = 'text' | 'contained' | 'outlined';
type ButtonMuiProps = ButtonProps & {
  variant?: TypeVariant;
  theme?: 'primary' | 'secondary' | string;
  rippleColor?: string;
};

type TypeStyledButtonMuiProps = {
  $variant: TypeVariant;
  $color: string;
};

const StyledButtonMui = styled.button<TypeStyledButtonMuiProps>`
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  padding: 4px 16px;
  overflow: hidden;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.75;
  color: rgb(0 0 0 / 65%);
  appearance: none;
  cursor: pointer;
  user-select: none;
  border: 0;
  border-radius: 4px;
  outline: none;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-tap-highlight-color: transparent;

  ${({ $variant, $color }) => {
    switch ($variant) {
      case 'outlined':
        return css`
          color: ${$color};
          background-color: transparent;
          border: 1px solid ${colorAlpha($color, 0.5)};
        `;
      case 'contained':
        return css`
          color: #fff;
          background-color: ${$color};
          box-shadow: 0 1px 5px 0 rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
            0 3px 1px -2px rgb(0 0 0 / 12%);

          &:hover {
            background-color: ${darken($color, 10)};
            box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%),
              0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
          }

          &:active {
            box-shadow: 0 5px 5px -3px rgb(0 0 0 / 20%),
              0 8px 10px 1px rgb(0 0 0 / 14%), 0 3px 14px 2px rgb(0 0 0 / 12%);
          }
        `;
      case 'text':
      default:
        return css`
          color: ${$color};
          background-color: transparent;
        `;
    }
  }}

  &:disabled {
    pointer-events: none;
    cursor: default;
    box-shadow: none;
  }
`;

export const ButtonMui: React.FC<ButtonMuiProps> = ({
  variant = 'text',
  theme = 'primary',
  rippleColor,
  children,
}) => {
  const _rippleColor = useMemo(() => {
    if (rippleColor) {
      return rippleColor;
    }
    if (variant === 'contained') {
      if (theme === 'primary' || theme === 'secondary') {
        return 'rgba(255, 255, 255, 0.3)';
      }
    } else {
      if (theme === 'primary') {
        return 'rgba(33, 150, 243, 0.25)';
      }
      if (theme === 'secondary') {
        return 'rgba(225, 0, 80, 0.25)';
      }
    }
    return 'rgba(0, 0, 0, 0.25)';
  }, [theme, rippleColor]);

  const $color = useMemo(() => {
    if (theme === 'primary') {
      return '#2196f3';
    }
    if (theme === 'secondary') {
      return '#e10050';
    }
    return theme;
  }, [theme]);

  return (
    <StyledButtonMui $variant={variant} $color={$color}>
      {children}
      <Ripple color={_rippleColor} duration={250} />
    </StyledButtonMui>
  );
};
