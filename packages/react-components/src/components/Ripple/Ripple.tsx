import React, { useRef, useState } from 'react';
import { useTransition, animated } from '@react-spring/web';

type TypeRipple = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export type RippleProps = {
  color?: string;
  duration?: number;
};

export const Ripple: React.FC<RippleProps> = ({
  color = 'rgba(0, 0, 0, 0.3)',
  duration = 300,
}) => {
  const [ripples, setRipples] = useState<TypeRipple[]>([]);
  const lastTouchTime = useRef(0);

  const transitions = useTransition(ripples, {
    from: { transform: 'scale(0)', opacity: 1 },
    enter: { transform: 'scale(1)' },
    leave: { opacity: 0 },
    config: { duration },
  });

  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    lastTouchTime.current = Date.now();

    const { x, y, width, height } = (
      e.target as HTMLDivElement
    ).getBoundingClientRect();
    const clickX = e.clientX || e.pageX;
    const clickY = e.clientY || e.pageY;
    const w = Math.abs(clickX - x);
    const h = Math.abs(clickY - y);
    const maxW = Math.max(width - w, w);
    const maxH = Math.max(height - h, h);
    const r = Math.sqrt(maxW ** 2 + maxH ** 2);

    const ripple = {
      top: clickY - y - r,
      left: clickX - x - r,
      width: r * 2,
      height: r * 2,
    };
    setRipples((prevRipples) => [...prevRipples, ripple]);
  };

  const onRemove = () => {
    const now = Date.now();
    const diff = now - lastTouchTime.current;
    if (diff > duration) {
      setRipples([]);
    } else {
      setTimeout(() => {
        setRipples((prevRipples) => prevRipples.slice(1));
      }, duration - diff);
    }
  };

  return (
    <div
      style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
      onMouseDown={onMouseDown}
      onMouseLeave={onRemove}
      onMouseUp={onRemove}
    >
      {transitions((style, item) => (
        <animated.div
          style={{
            ...style,
            ...item,
            backgroundColor: color,
            position: 'absolute',
            pointerEvents: 'none',
            borderRadius: '50%',
          }}
        ></animated.div>
      ))}
    </div>
  );
};
