import React, { useEffect, useRef, useState } from 'react';
import { animated, useSpring, useSpringRef } from '@react-spring/web';

import { IconLoading } from '../common/icons';

import { Api } from '../Api';

export type ImgProps = {
  width?: number;
  height?: number;
  placeholder?: React.ReactNode;
} & Omit<React.HTMLProps<HTMLImageElement>, 'placeholder'>;

export const Img: React.FC<ImgProps> = ({ placeholder, ...props }) => {
  const DURATION = 300;
  const imgRef = useRef(null);
  const fromStyle = useRef({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const toStyle = useRef({
    width: 0,
    height: 0,
  });

  const transApi = useSpringRef();
  const onPreview: React.MouseEventHandler<HTMLImageElement> = () => {
    const {
      x: left,
      y: top,
      width,
      height,
    } = (imgRef.current as unknown as HTMLImageElement).getBoundingClientRect();

    fromStyle.current.top = top;
    fromStyle.current.left = left;
    fromStyle.current.width = width;
    fromStyle.current.height = height;
    const stop = () => {
      transApi.start(() => [
        {
          top: fromStyle.current.top,
          left: fromStyle.current.left,
          width: toStyle.current.width,
          height: toStyle.current.height,
          scaleX: fromStyle.current.width / toStyle.current.width,
          scaleY: fromStyle.current.height / toStyle.current.height,
          position: 'absolute',
          config: {
            duration: DURATION,
          },
        },
      ]);
    };
    const start = () => {
      const bodyWidth = window.innerWidth;
      const bodyHeight = window.innerHeight;

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
          config: {
            duration: DURATION,
          },
        },
        {
          position: 'initial',
          width: 'auto',
          height: 'auto',
          delay: DURATION,
        },
      ]);
    };
    const Content = () => {
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
        },
        config: {
          duration: 0,
        },
      });

      useEffect(() => {
        start();
      }, []);
      return (
        <animated.img
          style={{
            ...spring,
            position: spring.position as any,
            transformOrigin: 'top left',
          }}
          src={props.src}
        />
      );
    };

    Api.mask({
      Content: <Content />,
      maskClosable: true,
      duration: DURATION,
      onClose: stop,
    });
  };

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = props.src as string;
    img.onload = () => {
      toStyle.current.width = img.width;
      toStyle.current.height = img.height;

      setLoaded(true);
    };
  }, [props]);

  if (loaded) {
    return <img ref={imgRef} {...props} onClick={onPreview} />;
  } else {
    return (
      <div
        {...props}
        style={{
          ...props.style,
          backgroundColor: 'rgb(247 247 247)',
          width: props.width,
          height: props.height,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {placeholder || <IconLoading style={{ fontSize: 24, color: '#bbb' }} />}
      </div>
    );
  }
};
