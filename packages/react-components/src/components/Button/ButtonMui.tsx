import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { Ripple } from '../Ripple';

import type { ButtonProps } from '.';
import { Color, IColor } from '@dsaco/utils';

export type ButtonMuiProps = React.HTMLProps<HTMLButtonElement> & {
  as?: React.ElementType<any>;
  type?: 'text' | 'contained' | 'outlined';
  color?: 'default' | 'primary' | 'secondary' | string;
  rippleColor?: string;
  round?: boolean;
};

type TypeStyledButtonMuiProps = {
  $type: 'text' | 'contained' | 'outlined';
  color?: 'default' | 'primary' | 'secondary' | string;
  $color: IColor;
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

  ${({ $type, $color, color }) => {
    if (color === 'default') {
      switch ($type) {
        case 'contained':
          return css`
            color: rgb(0 0 0 / 87%);
            background-color: #e0e0e0;
            box-shadow: 0 1px 5px 0 rgb(0 0 0 / 20%),
              0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%);

            &:hover:not([disabled]) {
              background-color: #c7c7c7;
              box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%),
                0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
            }

            &:active:not([disabled]) {
              box-shadow: 0 5px 5px -3px rgb(0 0 0 / 20%),
                0 8px 10px 1px rgb(0 0 0 / 14%), 0 3px 14px 2px rgb(0 0 0 / 12%);
            }
          `;
        case 'outlined':
          return css`
            color: rgb(0 0 0 / 87%);
            border: 1px solid rgb(0 0 0 / 23%);

            &:hover:not([disabled]) {
              background-color: rgb(0 0 0 / 8%);
            }
          `;
        case 'text':
          return css`
            color: rgb(0 0 0 / 87%);

            &:hover:not([disabled]) {
              background-color: rgb(0 0 0 / 8%);
            }
          `;
        default:
          return '';
      }
    }
    const _$color = $color.rgb;
    switch ($type) {
      case 'outlined':
        return css`
          color: ${_$color};
          background-color: transparent;
          border: 1px solid ${$color.alpha(0.5)};

          &:hover:not([disabled]) {
            background-color: ${$color.alpha(0.05)};
          }
        `;
      case 'contained':
        return css`
          color: #fff;
          background-color: ${_$color};
          box-shadow: 0 1px 5px 0 rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
            0 3px 1px -2px rgb(0 0 0 / 12%);

          &:hover:not([disabled]) {
            background-color: ${$color.darken(0.1)};
            box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%),
              0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
          }

          &:active:not([disabled]) {
            box-shadow: 0 5px 5px -3px rgb(0 0 0 / 20%),
              0 8px 10px 1px rgb(0 0 0 / 14%), 0 3px 14px 2px rgb(0 0 0 / 12%);
          }
        `;
      case 'text':
        return css`
          color: ${_$color};
          background-color: transparent;

          &:hover:not([disabled]) {
            background-color: ${$color.alpha(0.05)};
          }
        `;
      default:
        return '';
    }
  }}

  &:disabled {
    color: rgb(0 0 0 / 26%);
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const ButtonMui: React.FC<ButtonMuiProps> = ({
  type = 'contained',
  color = 'default',
  round,
  rippleColor,
  children,
  ...restProps
}) => {
  const _rippleColor = useMemo(() => {
    if (rippleColor) {
      return rippleColor;
    }
    if (color === 'default') {
      return 'rgba(0, 0, 0, 0.25)';
    }
    if (type === 'contained') {
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
    if (color === 'default') {
      return Color('#000');
    }
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
      $type={type}
      $color={$color}
      color={color}
      $round={round}
      {...restProps}
    >
      {children}
      <Ripple color={_rippleColor} duration={250} />
    </StyledButtonMui>
  );
};
