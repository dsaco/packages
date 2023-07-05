import React from 'react';
import styled from 'styled-components';

import { SwitchProps } from '.';

type TypeSwitch = React.FC<SwitchProps>;

const StyledSwitchAnt = styled.button<{
  $checked?: boolean;
  $width: number;
  $padding: number;
}>`
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  ${({ $width }) => `width: ${$width}px; height: ${$width / 2}px;`}
  cursor: pointer;
  user-select: none;
  background-color: ${({ $checked }) =>
    $checked ? '#1677ff' : 'rgba(0, 0, 0, 0.25)'};
  border: 0;
  border-radius: 25% / 50%;
  outline: 0;
  transition: background-color 0.2s;

  > div {
    position: absolute;
    top: ${({ $padding }) => $padding}px;
    inset-inline-start: ${({ $checked, $width, $padding }) =>
      $checked ? `calc(100% - ${$width / 2 - $padding}px)` : `${$padding}px`};
    ${({ $width, $padding }) => {
      const size = $width / 2 - $padding * 2;
      return `width: ${size}px; height: ${size}px;`;
    }}
    transition: all 0.2s ease-in-out;

    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      content: '';
      background-color: #fff;
      border-radius: ${({ $width, $padding }) => $width / 4 - $padding}px;
      transition: all 0.2s ease-in-out;
      inset-inline-start: 0;
      inset-inline-end: 0;
    }
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    > div::before {
      ${({ $checked }) =>
        $checked ? 'inset-inline-start' : 'inset-inline-end'}: -30%;
    }
  }

  &:hover:not(:disabled) {
    background-color: ${({ $checked }) =>
      $checked ? '#4096ff' : 'rgba(0, 0, 0, 0.45)'};
  }
`;

export const SwitchAnt: TypeSwitch = ({ checked, disabled, onChange }) => {
  return (
    <StyledSwitchAnt
      onClick={() => onChange?.(!checked)}
      disabled={disabled}
      $checked={checked}
      $width={44}
      $padding={2}
    >
      <div></div>
    </StyledSwitchAnt>
  );
};
