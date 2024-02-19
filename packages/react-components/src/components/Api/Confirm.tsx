import React, { createRef } from 'react';
import { createPortal } from 'react-dom';
import { Root, createRoot } from 'react-dom/client';
import styled from '@emotion/styled';
import { animated } from '@react-spring/web';

import { ButtonMui } from '../Button';
import { Container } from './common';
import type { IRef, Options, ContentProps } from './common';

export type ConfirmOptions = {
  title?: string;
  width?: number | string;
  content?: React.ReactNode;
  okText?: string;
  cancelText?: string;
  onOk?: () => void;
  onCancel?: () => void;
} & Omit<Options, 'id' | 'Content'>;

const StyledAnimatedContent = styled(animated.div)<{ width: number | string }>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => (typeof width === 'number' ? width + 'px' : width)};
  padding: 16px;
  overflow: hidden;
  font-size: 16px;
  color: rgb(0 0 0 / 88%);
  background-color: #fff;
  border-radius: 8px;
  box-shadow: rgb(0 0 0 / 20%) 0 11px 15px -7px,
    rgb(0 0 0 / 14%) 0 24px 38px 3px, rgb(0 0 0 / 12%) 0 9px 46px 8px;
`;
const StyledHeader = styled.header`
  margin-bottom: 16px;
  font-size: 14px;
`;
const StyledBody = styled.div`
  margin-bottom: 16px;
  font-size: 14px;
`;
const StyledFooter = styled.footer`
  display: flex;
  flex-shrink: 0;
  justify-content: flex-end;

  > button ~ button {
    margin-left: 16px;
  }
`;

const Content: React.FC<ConfirmOptions & ContentProps> = ({
  title,
  width = 416,
  content,
  okText = '确定',
  cancelText = '取消',
  onOk,
  onCancel,
  remove,
}) => {
  return (
    <StyledAnimatedContent width={width}>
      {title ? <StyledHeader>{title}</StyledHeader> : null}
      {content ? <StyledBody>{content}</StyledBody> : null}
      <StyledFooter>
        <ButtonMui
          onClick={() => {
            onCancel?.();
            remove?.();
          }}
          type="outlined"
        >
          {cancelText}
        </ButtonMui>
        <ButtonMui
          color="primary"
          onClick={() => {
            onOk?.();
            remove?.();
          }}
        >
          {okText}
        </ButtonMui>
      </StyledFooter>
    </StyledAnimatedContent>
  );
};

export class Confirm {
  private static ref: React.RefObject<IRef> = createRef<IRef>();
  private static key = 0;

  static init() {
    if (!Confirm.ref.current) {
      const root = createRoot(document.createElement('div'));
      root.render(createPortal(<Container ref={Confirm.ref} />, document.body));
    }
  }

  static confirm(options: ConfirmOptions) {
    const id = Confirm.key++;
    Confirm.ref.current?.add(
      Object.assign(options, {
        id,
        Content: <Content {...options} />,
      })
    );
  }
}
