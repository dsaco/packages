import { useEffect, useRef, useState } from 'react';
import type { MouseEventHandler, SetStateAction, Dispatch } from 'react';
import { createPortal } from 'react-dom';
import { useTransition, animated } from '@react-spring/web';

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
type MaskProps = {
  children?: React.ReactNode;
  maskClosable?: boolean;
};
type TypeMask = React.FC<MaskProps>;

const targetNode = document.createElement('div');

export const useMask: TypeUseMask = (props = {}) => {
  const { bgColor = 'rgba(0, 0, 0, 0.45)', duration } = props;
  const [visible, set] = useState(false);
  const target = useRef(targetNode);

  const transitions = useTransition(visible, {
    from: { backgroundColor: `rgba(0, 0, 0, 0)` },
    enter: { backgroundColor: bgColor },
    leave: { backgroundColor: `rgba(0, 0, 0, 0)` },
    config: {
      duration,
    },
  });

  useEffect(() => {
    if (!document.body.contains(targetNode)) {
      document.body.appendChild(target.current);
    }
  }, []);

  const Mask: TypeMask = ({ children, maskClosable = false }) => {
    const onMaskClick: MouseEventHandler<HTMLDivElement> = (e) => {
      e.stopPropagation();
      e.preventDefault();
      maskClosable && set(false);
    };
    return createPortal(
      transitions((style, show) => {
        return show ? (
          <animated.div
            style={{ ...style, position: 'fixed', inset: 0 }}
            onClick={onMaskClick}
          >
            {children}
          </animated.div>
        ) : null;
      }),
      target.current
    );
  };

  return { Mask, set, visible };
};

export const useModal = () => {
  const { Mask, visible, set } = useMask();

  return <Mask></Mask>;
};
