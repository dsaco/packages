import React, { createRef, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { animated, useSpring, useSpringRef } from '@react-spring/web';

import { Container } from './common';
import type { ContentProps, IRef, Options } from './common';

export type PreviewOptions = {
  ele: HTMLImageElement | null;
} & Omit<Options, 'id' | 'Content'>;

const Content: React.FC<PreviewOptions & ContentProps> = ({ ele }) => {
  const DURATION = 300;
  const fromStyle = useRef({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const toStyle = useRef({
    width: 0,
    height: 0,
    scaleX: 1,
    scaleY: 1,
  });

  const transApi = useSpringRef();
  const spring = useSpring({
    ref: transApi,
    from: {
      top: fromStyle.current.top,
      left: fromStyle.current.left,
      width: toStyle.current.width,
      height: toStyle.current.height,
      scaleX: fromStyle.current.width / toStyle.current.width,
      scaleY: fromStyle.current.height / toStyle.current.height,
      position: 'absolute',
      transformOrigin: 'top left',
    },
    config: {
      duration: 0,
    },
  });
  const init = () => {
    console.log('init');
    transApi.set({
      top: fromStyle.current.top,
      left: fromStyle.current.left,
      width: toStyle.current.width,
      height: toStyle.current.height,
      scaleX: fromStyle.current.width / toStyle.current.width,
      scaleY: fromStyle.current.height / toStyle.current.height,
      position: 'absolute',
      transformOrigin: 'top left',
    });
    start();
  };
  const start = () => {
    const bodyWidth = document.body.clientWidth;
    const bodyHeight = document.body.clientHeight;

    let { width, height } = toStyle.current;

    if (width < bodyWidth && height < bodyHeight) {
      // nochange
    } else if (width < bodyWidth) {
      width *= bodyHeight / height;
      height = bodyHeight;
    } else if (height < bodyHeight) {
      height *= bodyWidth / width;
      width = bodyWidth;
    } else {
      if (width / height > bodyWidth / bodyHeight) {
        height *= bodyWidth / width;
        width = bodyWidth;
      } else {
        width *= bodyHeight / height;
        height = bodyHeight;
      }
    }
    const left = (bodyWidth - width) / 2;
    const top = (bodyHeight - height) / 2;

    transApi.start(() => [
      {
        scaleX: 1,
        scaleY: 1,
        left: left < 0 ? 0 : left,
        top: top < 0 ? 0 : top,
        width,
        height,
        position: 'absolute',
        transformOrigin: 'top left',
        config: {
          duration: DURATION,
        },
      },
      {
        position: 'initial',
        transformOrigin: 'center',
        width: 'auto',
        height: 'auto',
        delay: DURATION,
      },
    ]);
  };
  useEffect(() => {
    if (ele) {
      const { x: left, y: top, width, height } = ele.getBoundingClientRect();

      fromStyle.current.top = top;
      fromStyle.current.left = left;
      fromStyle.current.width = width;
      fromStyle.current.height = height;

      const img = new Image();
      img.src = ele.src;
      img.onload = () => {
        toStyle.current.width = img.width;
        toStyle.current.height = img.height;
        init();
      };
    }
  }, []);
  const onDoubleClick = () => {
    transApi.start(() => {
      toStyle.current.scaleX += 0.1;
      toStyle.current.scaleY += 0.1;
      return [
        {
          scaleX: toStyle.current.scaleX,
          scaleY: toStyle.current.scaleY,
          config: {
            duration: 100,
          },
        },
      ];
    });
  };
  const onWheel = (a: any) => {
    console.log(a);
  };
  return (
    <animated.img
      src={ele?.src}
      style={{
        ...spring,
        position: spring.position as any,
        // transformOrigin: 'top left',
      }}
      onDoubleClick={onDoubleClick}
      onWheel={onWheel}
    />
  );
};

export class Preview {
  private static ref: React.RefObject<IRef> = createRef<IRef>();
  private static key = 0;

  static init() {
    if (!Preview.ref.current) {
      const root = createRoot(document.createElement('div'));
      root.render(createPortal(<Container ref={Preview.ref} />, document.body));
    }
  }

  static open(options: PreviewOptions) {
    const id = Preview.key++;
    Preview.ref.current?.add(
      Object.assign(options, {
        id,
        Content: <Content {...options} />,
      })
    );
  }
}
