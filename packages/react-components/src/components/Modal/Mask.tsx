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

export type MaskProps = {
  children?: React.ReactNode;
  visible?: boolean;
  onCancel?: () => void;
  destroyOnClose?: boolean;
  maskClosable?: boolean;
  maskColor?: string;
  maskBlur?: number;
  duration?: number;
  as?: React.ElementType<any>;
} & React.HTMLProps<HTMLDivElement>;

const container = document.createElement('div');

const AnimatedMask = animated(styled.div<{ maskColor: string; blur?: number }>`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ maskColor }) => maskColor};
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
  ...props
}) => {
  const [_visible, _setVisible] = useState(visible);
  useEffect(() => {
    if (!document.body.contains(container)) {
      document.body.appendChild(container);
    }
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
        _setVisible(false);
      }
    },
    [maskClosable]
  );

  const transApi = useSpringRef();
  const spring = useSpring({
    ref: transApi,
    from: { opacity: 0, display: 'none' },
    to: [{ opacity: 1, display: 'flex' }],
  });

  useEffect(() => {
    if (_visible) {
      transApi.start(() => {
        return [
          {
            opacity: 1,
            display: 'flex',
            config: { duration },
          },
        ];
      });
    } else {
      transApi.start(() => {
        return [
          { opacity: 0, config: { duration } },
          { display: 'none', delay: duration },
        ];
      });
    }
  }, [_visible]);

  return createPortal(
    <AnimatedMask
      {...props}
      ref={maskDiv}
      style={spring}
      onClick={onMaskClick}
      maskColor={maskColor}
      blur={maskBlur}
    >
      {destroyOnClose ? visible && children : children}
    </AnimatedMask>,
    container
  );
};
