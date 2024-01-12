import React, {
  createRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
  useMemo,
} from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { useTransition, animated } from '@react-spring/web';
import styled from '@emotion/styled';

import { ButtonMui } from '../Button';

export interface ConfirmOptions {
  title?: string;
  content?: React.ReactNode;
  width?: number;
  okText?: string;
  cancelText?: string;
  maskClosable?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
}
type TypeConfirmOptions = ConfirmOptions & { id: number };

type IRef = {
  add: (n: TypeConfirmOptions) => void;
  destroyAll: () => void;
};

const StyledAnimatedContainer = styled(animated.div)`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(0 0 0 / 30%);
`;
const StyledAnimatedContent = styled(animated.div)<{ width: number }>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width}px;
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

const Container = forwardRef((props, ref) => {
  const [notices, setNotices] = useState<TypeConfirmOptions[]>([]);
  const refMap = useMemo(() => new WeakMap(), []);
  const add = (notice: TypeConfirmOptions) => {
    setNotices((prev) => [...prev, notice]);
  };
  const destroyAll = () => {
    setNotices([]);
  };
  const remove = (item: TypeConfirmOptions) => {
    setNotices((prev) => prev.filter(({ id }) => id !== item.id));
  };

  useImperativeHandle(ref, () => ({
    add,
    destroyAll,
  }));

  const transitions = useTransition(notices, {
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  });

  const onMaskClick = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      item: TypeConfirmOptions
    ) => {
      if (item.maskClosable && refMap.has(e.target)) {
        e.stopPropagation();
        e.preventDefault();
        remove(item);
        refMap.delete(e.target);
      }
    },
    []
  );

  return transitions((style, item) => {
    const {
      title,
      content,
      width = 416,
      okText = '确定',
      cancelText = '取消',
      onOk,
      onCancel,
    } = item;
    return (
      <StyledAnimatedContainer
        style={{ opacity: style.opacity }}
        onClick={(e) => onMaskClick(e, item)}
        ref={(ref: HTMLDivElement) => ref && refMap.set(ref, item)}
      >
        <StyledAnimatedContent style={{ scale: style.scale }} width={width}>
          {title ? <StyledHeader>{title}</StyledHeader> : null}
          {content ? <StyledBody>{content}</StyledBody> : null}
          <StyledFooter>
            <ButtonMui
              onClick={() => {
                onCancel?.();
                remove(item);
              }}
              variant="outlined"
            >
              {cancelText}
            </ButtonMui>
            <ButtonMui
              onClick={() => {
                onOk?.();
                remove(item);
              }}
            >
              {okText}
            </ButtonMui>
          </StyledFooter>
        </StyledAnimatedContent>
      </StyledAnimatedContainer>
    );
  });
});

export class Notice {
  private static ref: React.RefObject<IRef> = createRef<IRef>();
  private static key = 0;

  private static _confirm(options: ConfirmOptions) {
    Notice.ref.current?.add({
      ...options,
      id: Notice.key++,
    });
  }

  static confirm(options: ConfirmOptions) {
    if (!Notice.ref.current) {
      const root = createRoot(document.createElement('div'));
      root.render(createPortal(<Container ref={Notice.ref} />, document.body));
      setTimeout(() => {
        Notice._confirm(options);
      });
      return;
    }
    Notice._confirm(options);
  }
  static destroyAll() {
    Notice.ref.current?.destroyAll();
  }
}
