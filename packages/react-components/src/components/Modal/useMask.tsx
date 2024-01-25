import React, { memo, useEffect, useRef, useState } from 'react';
import type { MouseEventHandler, SetStateAction, Dispatch } from 'react';
import { createPortal } from 'react-dom';
import { useTransition, animated } from '@react-spring/web';
import type { Partial } from '@react-spring/web';
import styled from '@emotion/styled';

type MaskProps = {
  children?: React.ReactNode;
  closable?: boolean;
};

type TypeUseMaskReturn = {
  Mask: React.FC<MaskProps>;
  set: Dispatch<SetStateAction<boolean>>;
  open: () => void;
  close: () => void;
  visible: boolean;
};
type TypeUseMaskParam = {
  color?: string;
  duration?: number;
  blur?: number;
};
type TypeUseMask = {
  (props?: TypeUseMaskParam): TypeUseMaskReturn;
};

const renderNode = document.createElement('div');

const AnimatedContainer = animated(styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`);

export const useMask: TypeUseMask = (props = {}) => {
  const { color = 'rgb(0 0 0 / 30%)', duration, blur = 2 } = props;
  const target = useRef(renderNode);
  const [visible, set] = useState(false);
  const open = () => set(true);
  const close = () => set(false);

  const from: Partial<React.CSSProperties> = {
    opacity: 0,
    backgroundColor: color,
  };
  const enter: Partial<React.CSSProperties> = {
    opacity: 1,
  };
  const leave: Partial<React.CSSProperties> = {
    opacity: 0,
  };
  if (blur) {
    from.backdropFilter = `blur(0px)`;
    enter.backdropFilter = `blur(${blur}px)`;
    leave.backdropFilter = `blur(0px)`;
  }

  const transitions = useTransition(visible, {
    from,
    enter,
    leave,
    config: {
      duration,
    },
  });

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.removeProperty('overflow');
    }
  }, [visible]);

  useEffect(() => {
    if (!document.body.contains(renderNode)) {
      document.body.appendChild(renderNode);
    }
  }, []);

  const _Mask: React.FC<MaskProps> = ({ children, closable = false }) => {
    const mask = useRef(null);
    const onMaskClick: MouseEventHandler<HTMLDivElement> = (e) => {
      if (e.target === mask.current && closable) {
        e.stopPropagation();
        e.preventDefault();
        set(false);
      }
    };
    return createPortal(
      transitions((style, show) => {
        return show ? (
          <AnimatedContainer ref={mask} style={style} onClick={onMaskClick}>
            {children}
          </AnimatedContainer>
        ) : null;
      }),
      target.current
    );
  };
  const Mask = memo(_Mask);

  return { Mask, set, open, close, visible };
};
