import { memo, useCallback, useEffect, useRef, useState } from 'react';
import type { MouseEventHandler, SetStateAction, Dispatch } from 'react';
import { createPortal } from 'react-dom';
import { useTransition, animated, easings } from '@react-spring/web';
import styled from 'styled-components';
import { IconClose } from '../common/icons';

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

type TypeUseModalParam = {
  bgColor?: string;
  duration?: number;
};

type TypeUseModalReturn = {
  Modal: React.FC<MaskProps>;
  set: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
};

type TypeUseModal = {
  (props?: TypeUseModalParam): TypeUseModalReturn;
};

type TypeModal = React.FC<MaskProps>;

const StyledAnimatedDialog = styled(animated.div)`
  display: flex;
  flex-direction: column;
  width: 520px;
  max-width: 100%;
  max-height: calc(100% - 64px);
  margin: 32px;
  overflow: hidden;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: rgb(0 0 0 / 20%) 0 11px 15px -7px,
    rgb(0 0 0 / 14%) 0 24px 38px 3px, rgb(0 0 0 / 12%) 0 9px 46px 8px;
`;

const StyledDialogHeader = styled.header`
  position: relative;
  height: 50px;
  padding-left: 16px;
  line-height: 50px;
`;
const StyledDialogClose = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;
const StyledDialogContent = styled.header`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background-color: yellow;
`;

export const useModal: TypeUseModal = (props = {}) => {
  const { bgColor, duration = 300 } = props;
  const { Mask, visible, set } = useMask({ bgColor, duration });

  const transitions = useTransition(visible, {
    from: { opacity: 0, transform: 'scale(0)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0)' },
    config: {
      duration,
      easing: easings.easeOutQuad,
    },
  });

  const Modal: TypeModal = ({ children, maskClosable }) => {
    const onClose = useCallback(() => {
      set(false);
    }, []);

    return (
      <Mask maskClosable={maskClosable}>
        {transitions((style, show) => {
          return show ? (
            <StyledAnimatedDialog style={style}>
              <StyledDialogHeader>
                <span>标题</span>
                <StyledDialogClose onClick={onClose}>
                  <IconClose style={{ width: 20, height: 20 }} />
                </StyledDialogClose>
              </StyledDialogHeader>
              <StyledDialogContent>{children}</StyledDialogContent>
            </StyledAnimatedDialog>
          ) : null;
        })}
      </Mask>
    );
  };

  return { Modal, visible, set };
};
