import { useCallback } from 'react';
import type { SetStateAction, Dispatch } from 'react';
import { useTransition, animated, easings } from '@react-spring/web';
import styled from 'styled-components';

import { useMask } from './useMask';
import { IconClose } from '../common/icons';

type ModalProps = {
  children?: React.ReactNode;
  closable?: boolean;
  title?: string;
};

type TypeUseModalParam = {
  color?: string;
  duration?: number;
};

type TypeUseModalReturn = {
  Modal: React.FC<ModalProps>;
  set: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
};

type TypeUseModal = {
  (props?: TypeUseModalParam): TypeUseModalReturn;
};

type TypeModal = React.FC<ModalProps>;

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
  flex-shrink: 0;
  height: 48px;
  padding-right: 48px;
  padding-left: 16px;
  overflow: hidden;
  line-height: 48px;
  text-overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-shadow: 0 1px 5px #ddd;
  -webkit-line-clamp: 1;
`;
const StyledDialogClose = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  cursor: pointer;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 3px 3px #ccc;
  }
`;
const StyledDialogContent = styled.header`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
`;

export const useModal: TypeUseModal = (props = {}) => {
  const { color, duration = 300 } = props;
  const { Mask, visible, set } = useMask({ color, duration });

  const transitions = useTransition(visible, {
    from: { opacity: 0, transform: 'scale(0)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0)' },
    config: {
      duration,
      easing: easings.easeOutQuad,
    },
  });

  const Modal: TypeModal = ({ children, closable, title = 'Untitled' }) => {
    const onClose = useCallback(() => {
      set(false);
    }, []);

    return (
      <Mask closable={closable}>
        {transitions((style, show) => {
          return show ? (
            <StyledAnimatedDialog style={style}>
              <StyledDialogHeader>
                <span>{title}</span>
                <StyledDialogClose onClick={onClose}>
                  <IconClose style={{ fontSize: 20 }} />
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
