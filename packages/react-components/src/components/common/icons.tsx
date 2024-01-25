import React from 'react';

type IconProps = React.HTMLProps<HTMLSpanElement>;

export const IconClose: React.FC<IconProps> = (props) => {
  return (
    <span {...props}>
      <svg
        viewBox="0 0 24 24"
        style={{ width: '1em', height: '1em', fill: 'currentcolor' }}
      >
        <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
      </svg>
    </span>
  );
};

export const IconLoading: React.FC<IconProps> = (props) => {
  return (
    <span {...props}>
      <svg
        viewBox="0 0 40 40"
        style={{
          width: '1em',
          height: '1em',
        }}
      >
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          strokeWidth="4"
          stroke="currentcolor"
          strokeDasharray={2 * Math.PI * 18}
          strokeDashoffset={Math.PI * 27}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 20 20"
            to="360 20 20"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </span>
  );
};
