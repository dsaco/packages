import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import styled from '@emotion/styled';
import { animated, useTransition } from '@react-spring/web';

export interface Options {
  id: number;
  duration?: number;
  maskClosable?: boolean;
  maskColor?: string;
  noOpacity?: boolean;
  zIndex?: number;
  Content: JSX.Element;
  onClose?: () => void;
}

export type ContentProps = {
  remove?: () => void;
};

export type IRef = {
  add: (o: Options) => void;
  destroy: (id: number) => void;
  destroyAll: () => void;
};

const StyledAnimatedContainer = animated(styled.div<{ zIndex: number }>`
  position: fixed;
  inset: 0;
  z-index: ${({ zIndex }) => zIndex};
  display: flex;
  align-items: center;
  justify-content: center;
`);

export const Container = forwardRef((props, ref) => {
  const refMap = useMemo(() => new WeakMap(), []);
  const [items, setItems] = useState<Options[]>([]);

  const add = (options: Options) => {
    setItems((prev) => [...prev, options]);
  };
  const destroy = (_id: number) => {
    setItems((prev) =>
      prev.filter(({ id, onClose }) => {
        id === _id && onClose?.();
        return id !== _id;
      })
    );
  };
  const destroyAll = () => {
    setItems((prevList) => {
      prevList.forEach(({ onClose }) => {
        onClose?.();
      });
      return [];
    });
  };
  useImperativeHandle(ref, () => ({
    add,
    destroy,
    destroyAll,
  }));
  const transitions = useTransition(items, {
    from: ({ noOpacity = false, maskColor = 'rgb(0 0 0 / 30%)' }) =>
      noOpacity
        ? { backgroundColor: 'rgb(0 0 0 / 0%)' }
        : { backgroundColor: maskColor, opacity: 0 },
    enter: ({ noOpacity = false, maskColor = 'rgb(0 0 0 / 30%)' }) =>
      noOpacity
        ? { backgroundColor: maskColor }
        : { backgroundColor: maskColor, opacity: 1 },
    leave: ({ noOpacity = false, maskColor = 'rgb(0 0 0 / 30%)' }) =>
      noOpacity
        ? { backgroundColor: 'rgb(0 0 0 / 0%)' }
        : { backgroundColor: maskColor, opacity: 0 },
    config: ({ duration }) => ({ duration }),
  });
  const onMaskClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>, item: Options) => {
      if (item.maskClosable && refMap.has(e.target)) {
        e.stopPropagation();
        e.preventDefault();
        destroy(item.id);
        refMap.delete(e.target);
      }
    },
    []
  );

  return (
    <div>
      {transitions((props, { zIndex = 1000, ...item }) => {
        return (
          <StyledAnimatedContainer
            style={{ ...props }}
            onClick={(e) => onMaskClick(e, item)}
            ref={(ref: HTMLDivElement) => ref && refMap.set(ref, item)}
            zIndex={zIndex}
          >
            {React.cloneElement(item.Content, {
              remove: () => destroy(item.id),
            })}
          </StyledAnimatedContainer>
        );
      })}
    </div>
  );
});
