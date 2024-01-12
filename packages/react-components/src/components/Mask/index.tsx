import styled from '@emotion/styled';
import { animated, useTransition } from '@react-spring/web';
import React, {
  createRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';

type MaskOptions = {
  key: string | number;
  content?: React.ReactNode;
  zIndex?: number;
  maskClosable?: boolean;
} & Omit<React.HTMLProps<HTMLDivElement>, 'content'>;

type IRef = {
  add: (options: MaskOptions) => void;
  destroy: (key: string | number) => void;
  destroyAll: () => void;
};

const StyledAnimatedContainer = styled(animated.div)`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(0 0 0 / 30%);
`;

const Container = forwardRef((props, ref) => {
  const refMap = useMemo(() => new WeakMap(), []);
  const [masks, setMasks] = useState<MaskOptions[]>([]);
  const add = (options: MaskOptions) => setMasks((prev) => [...prev, options]);
  const destroy = (targetKey: number | string) => {
    console.log(targetKey, masks);
    setMasks((prev) => prev.filter(({ key }) => key !== targetKey));
  };

  const remove = (options: MaskOptions) =>
    setMasks((prev) => prev.filter(({ key }) => key !== options.key));
  const destroyAll = () => setMasks([]);

  useImperativeHandle(ref, () => ({
    add,
    destroy,
    destroyAll,
  }));

  const transitions = useTransition(masks, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  const onMaskClick: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      const options = refMap.get(e.target);
      if (options?.maskClosable) {
        e.stopPropagation();
        e.preventDefault();
        remove(options);
        refMap.delete(e.target);
      }
    },
    []
  );
  return (
    <div>
      {transitions((props, item) => {
        const {
          key,
          content,
          zIndex = 1000,
          maskClosable,
          style,
          ...restProps
        } = item;
        return (
          <StyledAnimatedContainer
            {...restProps}
            ref={(ref: HTMLDivElement) => ref && refMap.set(ref, item)}
            style={{ ...props, zIndex, ...style }}
            onClick={onMaskClick}
          >
            {content}
          </StyledAnimatedContainer>
        );
      })}
    </div>
  );
});

export class mask {
  private static ref: React.RefObject<IRef> = createRef<IRef>();

  static init() {
    console.log('mask init');
    const root = createRoot(document.createElement('div'));
    root.render(createPortal(<Container ref={mask.ref} />, document.body));
  }

  static add(options: MaskOptions) {
    if (mask.ref.current) {
      mask.ref.current?.add(options);
    } else {
      mask.init();
      setTimeout(() => {
        mask.ref.current?.add(options);
      });
    }
  }

  static destroy(key: string | number) {
    console.log(key);
    mask.ref.current?.destroy(key);
  }

  static destroyAll() {
    mask.ref.current?.destroyAll();
  }
}

mask.init();
