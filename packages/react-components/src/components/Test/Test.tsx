import React from 'react';
import styled from 'styled-components';

const StyledSpan = styled.span<{
  color: string;
}>`
  color: ${({ color }) => color};
`;

export type TestProps = {
  color?: 'primary' | 'secondary' | string;
  rippleColor?: string;
  round?: boolean;
  obj?: {
    name?: string;
  };
};

export const Test: React.FC<TestProps> = ({ color, ...rest }) => {
  const delay = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  };
  console.log(rest);
  console.log(rest.obj?.name ?? 'abc');
  return <StyledSpan color="red">{`hello ${color}`}</StyledSpan>;
};
