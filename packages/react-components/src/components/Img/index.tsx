import React, { useEffect, useRef, useState } from 'react';
import { useTransition, animated } from '@react-spring/web';

import { useMask } from '../Modal/useMask';

type ImgProps = {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  placeholder?: React.ReactNode;
};

const Placeholder = () => {
  return (
    <svg viewBox="0 0 44 44" stroke="#fff">
      <g fill="none" fillRule="evenodd" strokeWidth="2">
        <circle cx="22" cy="22" r="17.3535">
          <animate
            attributeName="r"
            begin="0s"
            dur="1.8s"
            values="1; 20"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.165, 0.84, 0.44, 1"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            begin="0s"
            dur="1.8s"
            values="1; 0"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.3, 0.61, 0.355, 1"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="22" cy="22" r="19.9696">
          <animate
            attributeName="r"
            begin="-0.9s"
            dur="1.8s"
            values="1; 20"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.165, 0.84, 0.44, 1"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            begin="-0.9s"
            dur="1.8s"
            values="1; 0"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.3, 0.61, 0.355, 1"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
};
const Img: React.FC<ImgProps> = ({
  src,
  width,
  height,
  placeholder,
  ...restProps
}) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  const { Mask, set: setMask, visible: visiblePreview } = useMask();
  const [imgStyle, setImgStyle] = useState<React.CSSProperties>();
  const [imgSize, setImgSize] = useState<{ width: number; height: number }>();

  const imgTransitions = useTransition(visiblePreview, {
    from: {
      transform: `translate3d(0px, 0px, 0) scale3d(1, 1, 1)`,
    },
    enter: {
      transform: imgStyle?.transform,
    },
    leave: {
      transform: `translate3d(0px, 0px, 0) scale3d(1, 1, 1)`,
    },
  });

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSize({ width: img.width, height: img.height });
      setLoaded(true);
    };
  }, []);

  const onPreview = () => {
    const {
      x: left,
      y: top,
      width,
      height,
    } = (imgRef.current as unknown as HTMLImageElement).getBoundingClientRect();

    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;

    const iw = imgSize?.width ?? 0;
    const ih = imgSize?.height ?? 0;

    const offsetX = (clientWidth - width) / 2 - left;
    const offsetY = (clientHeight - height) / 2 - top;

    let scaleW;
    let scaleH;

    const bigerWidth = iw > clientWidth;
    const bigerHeight = ih > clientHeight;
    if (bigerWidth && bigerHeight) {
      if (iw / ih > clientWidth / clientHeight) {
        scaleW = clientWidth / width;
        scaleH = ((ih / iw) * clientWidth) / height;
      } else {
        scaleH = clientHeight / height;
        scaleW = ((iw / ih) * clientHeight) / width;
      }
    } else if (bigerWidth) {
      scaleW = clientWidth / width;
      scaleH = ((ih / iw) * clientWidth) / height;
    } else if (bigerHeight) {
      scaleH = clientHeight / height;
      scaleW = ((iw / ih) * clientHeight) / width;
    } else {
      scaleW = iw / width;
      scaleH = ih / height;
    }

    setImgStyle({
      left,
      top,
      width,
      height,
      transform: `translate3d(${offsetX}px, ${offsetY}px, 0) scale3d(${scaleW}, ${scaleH}, 1)`,
    });
    setMask(true);
  };

  if (loaded) {
    return (
      <>
        <img ref={imgRef} onClick={onPreview} src={src} {...restProps} />
        <Mask closable>
          {imgTransitions((style, show) =>
            show ? (
              <animated.img
                src={src}
                style={{
                  ...imgStyle,
                  ...style,
                  position: 'absolute',
                }}
                alt=""
              />
            ) : null
          )}
        </Mask>
      </>
    );
  } else {
    return (
      <div
        style={{
          ...restProps?.style,
          width,
          height,
          backgroundColor: '#eee',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className={restProps?.className}
      >
        {placeholder && typeof placeholder !== 'boolean' ? (
          placeholder
        ) : (
          <Placeholder />
        )}
      </div>
    );
  }
};

export default Img;
