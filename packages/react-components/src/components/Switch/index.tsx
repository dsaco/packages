import React, { useState } from 'react';
import styled from 'styled-components';

type SwitchProps = {
  value?: boolean;
  onChange?: (value: boolean) => void;
};
type TypeSwitch = React.FC<SwitchProps>;

const StyledSwitch = styled.button<{
  $bgColor?: string;
  $checked?: boolean;
  $holded?: boolean;
}>`
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  width: 44px;
  height: 22px;
  cursor: pointer;
  user-select: none;
  background-color: ${(props) =>
    props.$checked ? '#1677ff' : 'rgba(0, 0, 0, 0.25)'};
  border: 0;
  border-radius: 25% / 50%;
  outline: 0;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.$checked ? '#4096ff' : 'rgba(0, 0, 0, 0.45)'};
  }
`;
// transform: translateX(
//   ${(props) => (props.$checked && props.$holded ? '-6px' : '0px')}
// );
// transform: translateX(${(props) => (props.$checked ? '22px' : '0px')});

const StyledSwitchCircle = styled.div<{
  $bgColor?: string;
  $checked?: boolean;
  $holded?: boolean;
}>`
  position: absolute;
  top: 2px;
  inset-inline-start: ${(props) =>
    props.$checked ? 'calc(100% - 20px)' : '2px'};
  width: 18px;
  height: 18px;
  transition: all 0.2s ease-in-out;

  &::before {
    position: absolute;
    top: 0;
    bottom: 0;
    content: '';
    background-color: #fff;
    border-radius: 9px;
    transition: all 0.2s ease-in-out;
    inset-inline-start: ${(props) =>
      props.$holded && props.$checked ? '-30%' : 0};
    inset-inline-end: ${(props) =>
      props.$holded && !props.$checked ? '-30%' : 0};
  }

  ${StyledSwitch}:active & {
    &::before {
      inset-inline-start: 0;
    }
  }
`;

export const Switch: TypeSwitch = ({ value, onChange }) => {
  const [holded, setHolded] = useState(false);
  const onHold = () => {
    setHolded(true);
  };
  const onRelease = () => {
    setHolded(false);
  };
  return (
    <StyledSwitch
      onClick={() => onChange?.(!value)}
      onMouseDown={onHold}
      onMouseLeave={onRelease}
      onMouseUp={onRelease}
      $checked={value}
      $holded={holded}
    >
      <StyledSwitchCircle $checked={value} $holded={holded} />
    </StyledSwitch>
  );
};
