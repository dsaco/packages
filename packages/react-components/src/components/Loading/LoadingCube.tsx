import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

const scale = keyframes`
    from {
        transform: scale(0);
    }
    to {
        transform: scale(1);
    }
`;

const StyledCube = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  transform: scale(0);
  animation: ${scale} 0.4s ease infinite alternate;

  &::after {
    width: 20px;
    height: 20px;
    content: '';
    border-radius: 4px;
    transform: rotateZ(45deg);
  }

  &:nth-of-type(1) {
    &::after {
      background-color: blue;
    }
  }

  &:nth-of-type(2) {
    animation-delay: 0.1s;

    &::after {
      background-color: orange;
    }
  }

  &:nth-of-type(3) {
    animation-delay: 0.2s;

    &::after {
      background-color: red;
    }
  }

  &:nth-of-type(4) {
    animation-delay: 0.3s;

    &::after {
      background-color: green;
    }
  }
`;

export const LoadingCube = () => {
  return (
    <div className="loading-cube">
      <StyledCube></StyledCube>
      <StyledCube></StyledCube>
      <StyledCube></StyledCube>
      <StyledCube></StyledCube>
    </div>
  );
};
