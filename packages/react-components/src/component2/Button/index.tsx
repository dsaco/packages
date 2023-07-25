import React from 'react';

type ButtonProps = {
  msg?: string;
};
const Button: React.FC<ButtonProps> = ({ msg, ...rest }) => {
  console.log(rest);
  console.log(Promise);
  const a = 3;
  console.log([1, 2, 3].includes(a));
  return <span>{msg}</span>;
};

export default Button;
