import React, { useRef, useState } from 'react';
import { useTransition, animated } from '@react-spring/web';

type WaveProps = {
  duration?: number;
  color?: string;
};

export const Wave: React.FC<WaveProps> = ({
  color = '#1677ff',
  duration = 400,
}) => {
  const id = useRef(0);
  const [waves, setWaves] = useState<string[]>([]);
  const transitions = useTransition(waves, {
    // from: { boxShadow: 'scale(0)', opacity: 0.2 },
    enter: { boxShadow: 'scale(0)', opacity: 0.2 },
    leave: { opacity: 0 },
    config: { duration },
  });

  const onClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const key = `${id.current++}-${Date.now()}`;
    setWaves((prevWaves) => [...prevWaves, key]);
  };
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
      }}
      onClick={onClick}
    ></div>
  );
};
