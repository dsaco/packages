import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { animated, useSpring, useSpringRef } from '@react-spring/web';

import { IconClose } from '../common/icons';
import { Mask, symbol } from './Mask';
import type { MaskProps, MaskApiRef } from './Mask';

export type ModalProps = {
  title?: string;
  width?: number;
} & MaskProps;

const StyledAnimatedDialog = styled(animated.div)<{ width?: number }>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width || 520}px;
  max-width: 100%;
  max-height: calc(100% - 64px);
  margin: 32px;
  overflow: hidden;
  font-size: 16px;
  color: rgb(0 0 0 / 88%);
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

const StyledDialogContent = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
`;

export const Modal: React.FC<ModalProps> = ({
  children,
  title,
  visible,
  width,
  api,
  ...props
}) => {
  const [_visible, _setVisible] = useState(visible);
  useEffect(() => {
    api?.[symbol]?.({
      open: () => _setVisible(true),
      close: () => _setVisible(false),
    });
  }, []);
  useEffect(() => {
    _setVisible(visible);
  }, [visible]);

  const transApi = useSpringRef();
  const spring = useSpring({
    ref: transApi,
    config: {
      duration: 200,
    },
  });

  useEffect(() => {
    if (_visible) {
      transApi.start({ scale: 1 });
    } else {
      transApi.start({ scale: 0 });
    }
  }, [_visible]);

  const onCloseClick = () => {
    props.onCancel?.();
    if (typeof visible === 'undefined') {
      _setVisible(false);
    }
  };

  return (
    <Mask visible={_visible} {...props} onCancel={onCloseClick}>
      <StyledAnimatedDialog style={spring} width={width}>
        <StyledDialogHeader>
          <span>{title}</span>
          <StyledDialogClose onClick={onCloseClick}>
            <IconClose style={{ fontSize: 20 }} />
          </StyledDialogClose>
        </StyledDialogHeader>
        <StyledDialogContent>{children}</StyledDialogContent>
      </StyledAnimatedDialog>
    </Mask>
  );
};

export const useModal = () => {
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
