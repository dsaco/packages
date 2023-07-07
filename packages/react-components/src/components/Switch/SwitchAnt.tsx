import React from 'react';
import styled from 'styled-components';

import { SwitchProps } from '.';
import { IconLoading } from '../common/icons';

type SwitchAntProps = SwitchProps & {
  loading?: boolean;
  width?: number;
  height?: number;
  padding?: number;
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  activeColor?: string;
  inactiveColor?: string;
};
type TypeStyledSwitchAntProps = {
  $checked?: boolean;
  $loading?: boolean;
  $width?: number;
  $height: number;
  $padding: number;
  $activeColor?: string;
  $inactiveColor?: string;
};

const StyledSwitchInner = styled.div<TypeStyledSwitchAntProps>`
  display: block;
  height: 100%;
  ${({ $checked, $height, $padding }) => `
    padding-inline-start: ${
      $checked ? $height / 2 - $padding : $height + $padding
    }px;
    padding-inline-end: ${
      $checked ? $height + $padding : $height / 2 - $padding
    }px;
  `}
  overflow: hidden;
  line-height: ${({ $height }) => $height}px;
  border-radius: ${({ $height }) => $height}px;
  transition: padding-inline-start 0.2s ease-in-out,
    padding-inline-end 0.2s ease-in-out;
`;

const StyledSwitchInnerCheckExtend = styled.span<TypeStyledSwitchAntProps>`
  display: block;
  font-size: 12px;
  color: #fff;
  pointer-events: none;
  transition: margin-inline-start 0.2s ease-in-out,
    margin-inline-end 0.2s ease-in-out;
`;
const StyledSwitchInnerChecked = styled(StyledSwitchInnerCheckExtend)`
  ${({ $checked, $height, $padding }) => `
    margin-inline-start: ${
      $checked ? 0 : `calc(-100% - ${$height + $padding * 2}px)`
    };
    margin-inline-end: ${
      $checked ? 0 : `calc(100% + ${$height + $padding * 2}px)`
    };
  `}
`;

const StyledSwitchInnerUnchecked = styled(StyledSwitchInnerCheckExtend)`
  ${({ $checked, $height, $padding }) => `
    margin-inline-start: ${
      $checked ? `calc(100% + ${$height + $padding * 2}px)` : 0
    };
    margin-inline-end: ${
      $checked ? `calc(-100% - ${$height + $padding * 2}px)` : 0
    };
  `}
  margin-top: ${({ $height }) => -$height}px;
`;

const StyledSwitchAntHandle = styled.div<TypeStyledSwitchAntProps>`
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

const StyledSwitchAnt = styled.button<TypeStyledSwitchAntProps>`
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
    > ${StyledSwitchAntHandle}::before {
      ${({ $checked }) =>
        $checked ? 'inset-inline-start' : 'inset-inline-end'}: ${({
        $height,
      }) => -$height / 4}px;
    }

    ${StyledSwitchInnerChecked} {
      ${({ $checked, $height }) => {
        if ($checked) {
          return `
            margin-inline-start: ${-$height / 4}px;
            margin-inline-end: ${$height / 4}px;
          `;
        }
      }}
    }

    ${StyledSwitchInnerUnchecked} {
      ${({ $checked, $height }) => {
        if (!$checked) {
          return `
            margin-inline-start: ${$height / 4}px;
            margin-inline-end: ${-$height / 4}px;
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

export const SwitchAnt: React.FC<SwitchAntProps> = ({
  checked,
  disabled,
  onChange,
  loading,
  width,
  height = 22,
  padding = 2,
  checkedChildren,
  unCheckedChildren,
  activeColor,
  inactiveColor,
}) => {
  const styledProps: TypeStyledSwitchAntProps = {
    $checked: checked,
    $loading: loading,
    $width: width,
    $height: height,
    $padding: padding,
  };
  return (
    <StyledSwitchAnt
      onClick={() => onChange?.(!checked)}
      disabled={disabled || loading}
      {...styledProps}
    >
      <StyledSwitchAntHandle {...styledProps}>
        {loading && (
          <IconLoading
            style={{
              color: 'rgba(0, 0, 0, 0.65)',
              position: 'relative',
              fontSize: height - padding * 3,
            }}
          />
        )}
      </StyledSwitchAntHandle>
      <StyledSwitchInner {...styledProps}>
        <StyledSwitchInnerChecked {...styledProps}>
          {checkedChildren}
        </StyledSwitchInnerChecked>
        <StyledSwitchInnerUnchecked {...styledProps}>
          {unCheckedChildren}
        </StyledSwitchInnerUnchecked>
      </StyledSwitchInner>
    </StyledSwitchAnt>
  );
};
