import React from 'react';

type IconCloseProps = {
  size?: number;
} & Omit<React.HTMLProps<SVGSVGElement>, 'viewBox'>;
type TypeIconClose = React.FC<IconCloseProps>;
export const IconClose: TypeIconClose = (props = {}) => {
  const { size = 16, ...restProps } = props;
  return (
    <svg
      viewBox="0 0 24 24"
      style={{ width: size, height: size }}
      {...restProps}
    >
      <path
        fill="currentcolor"
        d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
      ></path>
    </svg>
  );
};
