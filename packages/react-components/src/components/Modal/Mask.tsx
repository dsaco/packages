import { memo, useEffect, useRef, useState } from 'react';
import type { MouseEventHandler, SetStateAction, Dispatch } from 'react';
import { createPortal } from 'react-dom';
import { useTransition, animated } from '@react-spring/web';

type MaskProps = {
  children?: React.ReactNode;
  maskClosable?: boolean;
};
type TypeMask = React.FC<MaskProps>;

type TypeUseMaskReturn = {
  Mask: React.FC<MaskProps>;
  set: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
};
type TypeUseMaskParam = {
  bgColor?: string;
  duration?: number;
};
type TypeUseMask = {
  (props?: TypeUseMaskParam): TypeUseMaskReturn;
};

const targetNode = document.createElement('div');

export const useMask: TypeUseMask = (props = {}) => {
  const { bgColor = 'rgba(0, 0, 0, 0.3)', duration } = props;
  const [visible, set] = useState(false);
  const target = useRef(targetNode);

  const transitions = useTransition(visible, {
    from: { backgroundColor: `rgba(0, 0, 0, 0)`, backdropFilter: 'blur(0px)' },
    enter: { backgroundColor: bgColor, backdropFilter: 'blur(2px)' },
    leave: { backgroundColor: `rgba(0, 0, 0, 0)`, backdropFilter: 'blur(0px)' },
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
    if (!document.body.contains(targetNode)) {
      document.body.appendChild(target.current);
    }
  }, []);

  const _Mask: TypeMask = ({ children, maskClosable = false }) => {
    const mask = useRef(null);
    const onMaskClick: MouseEventHandler<HTMLDivElement> = (e) => {
      e.stopPropagation();
      e.preventDefault();
      maskClosable && e.target === mask.current && set(false);
    };
    return createPortal(
      transitions((style, show) => {
        return show ? (
          <animated.div
            ref={mask}
            style={{
              ...style,
              position: 'fixed',
              inset: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={onMaskClick}
          >
            {children}
          </animated.div>
        ) : null;
      }),
      target.current
    );
  };
  const Mask = memo(_Mask);

  return { Mask, set, visible };
};
