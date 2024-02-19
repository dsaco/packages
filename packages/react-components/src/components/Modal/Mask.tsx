'use client';
import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { animated, useSpring, useSpringRef } from '@react-spring/web';

export const symbol = Symbol('mask ref init');

export type MaskApiRef = {
  open: () => void;
  close: () => void;
  [symbol]: (params: Omit<MaskApiRef, symbol>) => void;
};

export type MaskProps = {
  children?: React.ReactNode;
  visible?: boolean;
  onCancel?: () => void;
  destroyOnClose?: boolean;
  maskClosable?: boolean;
  maskColor?: string;
  maskBlur?: number;
  duration?: number;
  noOpacity?: boolean;
  api?: MaskApiRef;
  as?: React.ElementType<any>;
} & React.HTMLProps<HTMLDivElement>;

let container: Element;
if (typeof window !== 'undefined') {
  container = document.createElement('div');
}

const AnimatedMask = animated(styled.div<{ blur?: number }>`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ blur }) => (blur ? `backdrop-filter: blur(${blur}px);` : '')}
`);

export const Mask: React.FC<MaskProps> = ({
  children,
  maskClosable,
  maskColor = 'rgb(0 0 0 / 45%)',
  maskBlur,
  visible,
  onCancel,
  destroyOnClose,
  duration = 300,
  noOpacity = false,
  api,
  ...props
}) => {
  const [_visible, _setVisible] = useState(visible);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!document.body.contains(container)) {
      document.body.appendChild(container);
    }
    api?.[symbol]?.({
      open: () => _setVisible(true),
      close: () => _setVisible(false),
    });
    setMounted(true);
  }, []);

  useEffect(() => {
    _setVisible(visible);
  }, [visible]);

  const maskDiv = useRef(null);
  const onMaskClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (maskClosable && maskDiv.current === e.target) {
        e.stopPropagation();
        e.preventDefault();
        onCancel?.();
        if (typeof visible === 'undefined') {
          _setVisible(false);
        }
      }
    },
    [maskClosable, visible]
  );

  const transApi = useSpringRef();
  const spring = useSpring({
    ref: transApi,
    from: {
      opacity: 1,
      backgroundColor: maskColor,
      display: 'none',
    },
    to: [{ opacity: 1, backgroundColor: maskColor, display: 'flex' }],
  });

  useEffect(() => {
    if (_visible) {
      document.body.style.overflow = 'hidden';
      transApi.start(() => {
        return [
          {
            ...(noOpacity
              ? {
                  backgroundColor: maskColor,
                }
              : {
                  opacity: 1,
                }),
            display: 'flex',
            config: { duration },
          },
        ];
      });
    } else {
      document.body.style.removeProperty('overflow');
      transApi.start(() => {
        return [
          {
            ...(noOpacity
              ? {
                  backgroundColor: 'rgb(0 0 0 / 0%)',
                }
              : {
                  opacity: 0,
                }),
            config: { duration },
          },
          { display: 'none', delay: duration },
        ];
      });
    }
  }, [_visible]);

  return mounted
    ? createPortal(
        <AnimatedMask
          {...props}
          ref={maskDiv}
          style={spring}
          onClick={onMaskClick}
          blur={maskBlur}
        >
          {destroyOnClose ? visible && children : children}
        </AnimatedMask>,
        container
      )
    : null;
};

export const useMask = () => {
  const ref = useRef<MaskApiRef>({
    [symbol]({ open, close }: any) {
      ref.current.open = open;
      ref.current.close = close;
    },
    open() {
      // need complete
    },
    close() {
      // need complete
    },
  });

  return [ref.current];
};
