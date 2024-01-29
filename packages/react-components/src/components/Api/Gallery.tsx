import React, { createRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Root, createRoot } from 'react-dom/client';
import styled from '@emotion/styled';
import { animated, useSprings } from '@react-spring/web';

import { Container } from './common';
import type { IRef, Options, ContentProps } from './common';

export type GalleryOptions = {
  index?: number;
  photos: string[];
} & Omit<Options, 'id' | 'Content'>;

const StyledClose = styled.div`
  position: absolute;
  top: 32px;
  right: 32px;
  z-index: 1001;
  width: 40px;
  height: 40px;
  cursor: pointer;

  &::before {
    position: absolute;
    top: 18px;
    width: 100%;
    height: 4px;
    content: '';
    background-color: #fff;
    box-shadow: 0 0 5px #000;
    transform: rotateZ(45deg);
  }

  &::after {
    position: absolute;
    top: 18px;
    width: 100%;
    height: 4px;
    content: '';
    background-color: #fff;
    box-shadow: 0 0 5px #000;
    transform: rotateZ(-45deg);
  }

  &:hover {
    &::before,
    &::after {
      box-shadow: none;
    }
  }
`;
const StyledArrow = styled.div<{ left?: boolean }>`
  position: absolute;
  top: 50%;
  ${({ left }) => (left ? 'left: 8px;' : 'right: 8px;')}
  z-index: 1001;
  width: 40px;
  height: 40px;
  cursor: pointer;

  &::before {
    position: absolute;
    top: 8px;
    width: 80%;
    height: 4px;
    content: '';
    background-color: #fff;
    box-shadow: -2px 0 5px #000;
    transform: rotateZ(${({ left }) => (left ? '-' : '')}45deg);
  }

  &::after {
    position: absolute;
    bottom: 8px;
    width: 80%;
    height: 4px;
    content: '';
    background-color: #fff;
    box-shadow: -2px 0 5px #000;
    transform: rotateZ(${({ left }) => (left ? '' : '-')}45deg);
  }

  &:hover {
    &::before,
    &::after {
      box-shadow: none;
    }
  }
`;

const StyledGallery = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
const StyledAnimatedImg = animated(styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`);
const GalleryContainer: React.FC<ContentProps & GalleryOptions> = ({
  index = 0,
  photos,
  remove,
}) => {
  const len = photos.length;
  const [i, seti] = useState(index);

  const [props] = useSprings(
    len,
    (idx) => ({
      translateX: i < idx ? '100%' : i > idx ? '-100%' : '0%',
    }),
    [i]
  );

  const onPrev = () => {
    seti((p) => p - 1);
  };
  const onNext = () => {
    seti((p) => p + 1);
  };
  return (
    <StyledGallery>
      <StyledClose onClick={remove} />
      {i > 0 && <StyledArrow left onClick={onPrev} />}
      {i < len - 1 && <StyledArrow onClick={onNext} />}
      {props.map((style, idx) => (
        <StyledAnimatedImg key={photos[idx]} style={style}>
          <img src={photos[idx]} />
        </StyledAnimatedImg>
      ))}
    </StyledGallery>
  );
};

export class Gallery {
  private static ref: React.RefObject<IRef> = createRef<IRef>();
  private static key = 0;

  static init() {
    if (!Gallery.ref.current) {
      const root = createRoot(document.createElement('div'));
      root.render(createPortal(<Container ref={Gallery.ref} />, document.body));
    }
  }

  static preview(options: GalleryOptions) {
    const id = Gallery.key++;
    Gallery.ref.current?.add(
      Object.assign(options, {
        id,
        Content: <GalleryContainer {...options} />,
      })
    );
  }
}
