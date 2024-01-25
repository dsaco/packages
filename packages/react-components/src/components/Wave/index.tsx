import React, { useRef, useState } from 'react';
import { useTransition, animated, easings } from '@react-spring/web';

type WaveProps = {
  duration?: number;
  color?: string;
  borderRadius?: number;
};

export const Wave: React.FC<WaveProps> = ({
  color = '#1677ff',
  duration = 400,
  borderRadius = 6,
}) => {
  const id = useRef(0);
  const [waves, setWaves] = useState<string[]>([]);
  const transitions = useTransition(waves, {
    from: { boxShadow: `0 0 0 0px ${color}`, opacity: 0.5 },
    enter: { boxShadow: `0 0 0 8px ${color}`, opacity: 0.5 },
    leave: { opacity: 0 },
    config: { duration, easing: easings.easeOutSine },
  });

  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const key = `${id.current++}-${Date.now()}`;
    setWaves((prevWaves) => [...prevWaves, key]);
  };
  const onRemove = () => {
    setTimeout(() => {
      setWaves((prevWaves) => prevWaves.slice(1));
    }, 0);
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
            borderRadius,
          }}
        ></animated.div>
      ))}
    </div>
  );
};
