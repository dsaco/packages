import React from 'react';

export { ButtonMui } from './ButtonMui';
export { ButtonAnt } from './ButtonAnt';

export type ButtonProps = {
  type?: 'submit' | 'reset' | 'button' | undefined;
} & Omit<React.HTMLProps<HTMLButtonElement>, 'type'>;
