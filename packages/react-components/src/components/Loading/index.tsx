import React from 'react';
import styles from './index.module.scss';
export { LoadingCube } from './LoadingCube';

type CircularProgressProps = {
  size?: number;
  color?: string;
};

export const CircularProgress: React.FC<CircularProgressProps> = ({
  size = 40,
  color = '#ccc',
}) => {
  return (
    <div style={{ width: size, height: size, color }}>
      <svg className={styles.spin} viewBox="22 22 44 44">
        <circle
          className={styles.circle}
          cx="44"
          cy="44"
          r="20.2"
          fill="none"
          strokeWidth="3.6"
        ></circle>
      </svg>
    </div>
  );
};
