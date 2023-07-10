import React from 'react';
import styled from 'styled-components';

import type { ButtonProps } from '.';

const StyledButtonMui = styled.button`
  color: red;
`;

export const ButtonMui: React.FC<ButtonProps> = ({ children }) => {
  return <StyledButtonMui>{children}</StyledButtonMui>;
};
