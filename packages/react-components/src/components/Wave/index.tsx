import React, { useRef, useState } from 'react';
import { useTransition, animated } from '@react-spring/web';

type WaveProps = {
  duration?: number;
  color?: string;
};

export const Wave: React.FC<WaveProps> = ({
  color = '#1677ff',
  duration = 200,
}) => {
  const id = useRef(0);
  const [waves, setWaves] = useState<string[]>([]);
  const transitions = useTransition(waves, {
    from: { boxShadow: '0 0 0 0px #1677ff', opacity: 0.2 },
    enter: { boxShadow: '0 0 0 6px #1677ff', opacity: 0.16 },
    leave: { opacity: 0 },
    config: { duration },
  });

  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const key = `${id.current++}-${Date.now()}`;
    setWaves((prevWaves) => [...prevWaves, key]);
  };
  const onRemove = () => {
    setTimeout(() => {
      setWaves((prevWaves) => prevWaves.slice(1));
    }, duration * 2);
  };
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
      }}
      onClick={onMouseDown}
      onMouseLeave={onRemove}
      onMouseUp={onRemove}
    >
      {transitions((style, item) => (
        <animated.div
          style={{
            ...style,
            position: 'absolute',
            inset: 0,
            borderRadius: 6,
          }}
        ></animated.div>
      ))}
    </div>
  );
};
