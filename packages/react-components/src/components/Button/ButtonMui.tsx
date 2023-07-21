import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';

import Ripple from '../Ripple';

import type { ButtonProps } from '.';
import { Color } from '@dsaco/utils';
import type { TypeColor } from '@dsaco/utils';

type TypeVariant = 'text' | 'contained' | 'outlined';
export type ButtonMuiProps = ButtonProps & {
  variant?: TypeVariant;
  color?: 'primary' | 'secondary' | string;
  rippleColor?: string;
  round?: boolean;
};

type TypeStyledButtonMuiProps = {
  $variant: TypeVariant;
  $color: TypeColor;
  $round?: boolean;
};

const StyledButtonMui = styled.button<TypeStyledButtonMuiProps>`
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 1rem;
  overflow: hidden;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.75;
  color: rgb(0 0 0 / 65%);
  appearance: none;
  cursor: pointer;
  user-select: none;
  border: 0;
  border-radius: ${({ $round }) => ($round ? '999px' : '4px')};
  outline: none;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-tap-highlight-color: transparent;

  ${({ $variant, $color }) => {
    const _$color = $color.rgb;
    switch ($variant) {
      case 'outlined':
        return css`
          color: ${_$color};
          background-color: transparent;
          border: 1px solid ${$color.alpha(0.5)};

          &:hover {
            background-color: ${$color.alpha(0.05)};
          }
        `;
      case 'contained':
        return css`
          color: #fff;
          background-color: ${_$color};
          box-shadow: 0 1px 5px 0 rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
            0 3px 1px -2px rgb(0 0 0 / 12%);

          &:hover {
            background-color: ${$color.darken(0.1)};
            box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%),
              0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
          }

          &:active {
            box-shadow: 0 5px 5px -3px rgb(0 0 0 / 20%),
              0 8px 10px 1px rgb(0 0 0 / 14%), 0 3px 14px 2px rgb(0 0 0 / 12%);
          }
        `;
      case 'text':
        return css`
          color: ${_$color};
          background-color: transparent;

          &:hover {
            background-color: ${$color.alpha(0.05)};
          }
        `;
      default:
        return '';
    }
  }}

  &:disabled {
    pointer-events: none;
    cursor: default;
    box-shadow: none;

    ${({ $variant }) => {
      switch ($variant) {
        case 'outlined':
          return css`
            color: rgb(0 0 0 / 26%);
            border: 1px solid rgb(0 0 0 / 12%);
          `;
        case 'contained':
          return css`
            color: rgb(0 0 0 / 26%);
            background-color: rgb(0 0 0 / 12%);
          `;
        case 'text':
          return css`
            color: rgb(0 0 0 / 26%);
          `;
        default:
          return '';
      }
    }}
  }
`;

export const ButtonMui: React.FC<ButtonMuiProps> = ({
  variant = 'contained',
  color = 'primary',
  round,
  rippleColor,
  children,
  ...restProps
}) => {
  const _rippleColor = useMemo(() => {
    if (rippleColor) {
      return rippleColor;
    }
    if (variant === 'contained') {
      return 'rgba(255, 255, 255, 0.3)';
    } else {
      if (color === 'primary') {
        return Color('#2196f3').alpha(0.25);
      }
      if (color === 'secondary') {
        return Color('#e10050').alpha(0.25);
      }
      return Color(color).alpha(0.25);
    }
  }, [color, rippleColor]);

  const $color = useMemo(() => {
    if (color === 'primary') {
      return Color('#2196f3');
    }
    if (color === 'secondary') {
      return Color('#e10050');
    }
    return Color(color);
  }, [color]);

  return (
    <StyledButtonMui
      $variant={variant}
      $color={$color}
      $round={round}
      {...restProps}
    >
      {children}
      <Ripple color={_rippleColor} duration={250} />
    </StyledButtonMui>
  );
};
