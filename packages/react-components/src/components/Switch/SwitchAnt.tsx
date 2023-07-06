import React from 'react';
import styled from 'styled-components';

import { SwitchProps } from '.';
import { IconLoading } from '../common/icons';

type SwitchAntProps = SwitchProps & {
  loading?: boolean;
  height?: number;
  padding?: number;
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
};
type TypeSwitchAnt = React.FC<SwitchAntProps>;

const StyledSwitchAntHandle = styled.div<{
  $checked?: boolean;
  $width: number;
  $padding: number;
}>`
  position: absolute;
  top: ${({ $padding }) => $padding}px;
  inset-inline-start: ${({ $checked, $width, $padding }) =>
    $checked ? `calc(100% - ${$width / 2 - $padding}px)` : `${$padding}px`};
  ${({ $width, $padding }) => {
    const size = $width / 2 - $padding * 2;
    return `width: ${size}px; height: ${size}px;`;
  }}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ $padding }) => $padding}px;
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
`;

const StyledSwitchAnt = styled.button<{
  $checked?: boolean;
  $loading?: boolean;
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

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }

  &:active:not(:disabled) {
    > ${StyledSwitchAntHandle}::before {
      ${({ $checked }) =>
        $checked ? 'inset-inline-start' : 'inset-inline-end'}: -30%;
    }
  }

  &:hover:not(:disabled) {
    background-color: ${({ $checked }) =>
      $checked ? '#4096ff' : 'rgba(0, 0, 0, 0.45)'};
  }
`;

export const SwitchAnt: TypeSwitchAnt = ({
  loading,
  checked,
  disabled,
  onChange,
}) => {
  return (
    <StyledSwitchAnt
      onClick={() => onChange?.(!checked)}
      disabled={disabled || loading}
      $checked={checked}
      $loading={loading}
      $width={44}
      $padding={2}
    >
      <StyledSwitchAntHandle $checked={checked} $width={44} $padding={2}>
        {loading && (
          <IconLoading
            style={{ color: 'rgba(0, 0, 0, 0.65)', position: 'relative' }}
          />
        )}
      </StyledSwitchAntHandle>
    </StyledSwitchAnt>
  );
};

const StyledSwitchInner = styled.div<{
  $checked?: boolean;
  $height: number;
}>`
  display: block;
  height: 100%;
  ${({ $checked }) => `
    padding-inline-start: ${$checked ? 9 : 24}px;
    padding-inline-end: ${$checked ? 24 : 9}px;
  `}
  line-height: ${({ $height }) => $height}px;
  border-radius: ${({ $height }) => $height}px;
  transition: padding-inline-start 0.2s ease-in-out,
    padding-inline-end 0.2s ease-in-out;
`;

const StyledSwitchInnerChecked = styled.span<{
  $checked?: boolean;
}>`
  display: block;
  ${({ $checked }) => `
    margin-inline-start: ${$checked ? 0 : 'calc(-100% + 22px - 48px)'};
    margin-inline-end: ${$checked ? 0 : 'calc(100% - 22px + 48px)'};
  `}
  font-size: 12px;
  color: #fff;
  pointer-events: none;
  transition: margin-inline-start 0.2s ease-in-out,
    margin-inline-end 0.2s ease-in-out;
`;

const StyledSwitchInnerUnchecked = styled.span<{
  $checked?: boolean;
  $height: number;
  $padding: number;
}>`
  display: block;
  ${({ $checked, $height, $padding }) => `
    margin-inline-start: ${$checked ? `calc(100% - ${$height}px + 48px)` : 0};
    margin-inline-end: ${$checked ? `calc(-100% + ${$height}px - 48px)` : 0};
  `}
  margin-top: ${({ $height }) => -$height}px;
  font-size: 12px;
  color: #fff;
  pointer-events: none;
  transition: margin-inline-start 0.2s ease-in-out,
    margin-inline-end 0.2s ease-in-out;
`;

const StyledSwitchAntMoveHandle = styled.div<{
  $checked?: boolean;
  $width?: number;
  $height: number;
  $padding: number;
}>`
  position: absolute;
  top: ${({ $padding }) => $padding}px;
  inset-inline-start: ${({ $checked, $height, $padding }) =>
    $checked ? `calc(100% - ${$height - $padding}px)` : `${$padding}px`};
  ${({ $height, $padding }) => `
    width: ${$height - $padding * 2}px;
    height: ${$height - $padding * 2}px;
  `}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;

  &::before {
    position: absolute;
    top: 0;
    bottom: 0;
    content: '';
    background-color: #fff;
    border-radius: ${({ $height }) => $height}px;
    box-shadow: 0 2px 4px 0 rgb(0 35 11 / 20%);
    transition: all 0.2s ease-in-out;
    inset-inline-end: 0;
    inset-inline-start: 0;
  }
`;

const StyledSwitchAntMove = styled.button<{
  $checked?: boolean;
  $loading?: boolean;
  $width?: number;
  $height: number;
  $padding: number;
}>`
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  ${({ $width, $height }) => {
    if ($width) {
      return `width: ${$width}px;`;
    } else {
      return `min-width: ${$height * 2}px;`;
    }
  }}
  height: ${({ $height }) => $height}px;
  cursor: pointer;
  user-select: none;
  background-color: ${({ $checked }) =>
    $checked ? '#1677ff' : 'rgba(0, 0, 0, 0.25)'};
  border: 0;
  border-radius: ${({ $height }) => $height}px;
  outline: 0;
  transition: all 0.2s;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }

  &:active:not(:disabled) {
    > ${StyledSwitchAntMoveHandle}::before {
      ${({ $checked }) =>
        $checked ? 'inset-inline-start' : 'inset-inline-end'}: -30%;
    }

    ${StyledSwitchInnerChecked} {
      ${({ $checked }) => {
        if ($checked) {
          return `
            margin-inline-start: -4px;
            margin-inline-end: 4px;
          `;
        }
      }}
    }

    ${StyledSwitchInnerUnchecked} {
      ${({ $checked }) => {
        if (!$checked) {
          return `
            margin-inline-start: 4px;
            margin-inline-end: -4px;
          `;
        }
      }}
    }
  }

  &:hover:not(:disabled) {
    background-color: ${({ $checked }) =>
      $checked ? '#4096ff' : 'rgba(0, 0, 0, 0.45)'};
  }
`;

export const SwitchMove: TypeSwitchAnt = ({
  checked,
  disabled,
  loading,
  onChange,
  height = 22,
  padding = 2,
  checkedChildren,
  unCheckedChildren,
}) => {
  return (
    <StyledSwitchAntMove
      onClick={() => onChange?.(!checked)}
      disabled={disabled || loading}
      $checked={checked}
      $loading={loading}
      $height={height}
      $padding={padding}
    >
      <StyledSwitchAntMoveHandle
        $checked={checked}
        $height={height}
        $padding={padding}
      >
        {loading && (
          <IconLoading
            style={{
              color: 'rgba(0, 0, 0, 0.65)',
              position: 'relative',
              fontSize: height - padding * 3,
            }}
          />
        )}
      </StyledSwitchAntMoveHandle>
      <StyledSwitchInner $height={height} $checked={checked}>
        <StyledSwitchInnerChecked $checked={checked}>
          {checkedChildren}
        </StyledSwitchInnerChecked>
        <StyledSwitchInnerUnchecked
          $checked={checked}
          $height={height}
          $padding={padding}
        >
          {unCheckedChildren}
        </StyledSwitchInnerUnchecked>
      </StyledSwitchInner>
    </StyledSwitchAntMove>
  );
};
