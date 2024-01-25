import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import React from 'react';

type WaveProgressProps = {
  size?: number;
};

const spin = keyframes`
	from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledContainer = styled.div<{ size: number }>`
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  overflow: hidden;
  background-color: #eee;
  border-radius: 50%;
`;

const StyledWave = styled.div`
  position: absolute;
  top: 50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background-color: #0ff9;
  border-radius: 40%;
  animation: ${spin} 8s infinite;
`;

export const WaveProgress: React.FC<WaveProgressProps> = (props) => {
  const { size = 200 } = props;
  return (
    <StyledContainer size={size}>
      <StyledWave />
    </StyledContainer>
  );
};
