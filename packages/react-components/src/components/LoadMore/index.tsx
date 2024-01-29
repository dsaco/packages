import React, { HTMLProps, useEffect, useRef } from 'react';

export type LoadMoreProps = {
  load: () => void;
  wait?: number;
  noMore?: boolean;
} & HTMLProps<HTMLDivElement>;

export const LoadMore: React.FC<LoadMoreProps> = ({
  load,
  wait = 500,
  noMore = false,
  children,
}) => {
  const sentinel = useRef(null);

  useEffect(() => {
    let intersectionObserver: IntersectionObserver;
    let showing = false;
    let timer: ReturnType<typeof setTimeout>;
    if (noMore) {
      return;
    }
    if (sentinel.current) {
      intersectionObserver = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && !showing) {
          showing = true;
          load();
          timer = setInterval(load, wait);
        } else {
          clearTimeout(timer);
          showing = false;
        }
      });
      intersectionObserver.observe(sentinel.current);
    }
    return () => {
      clearInterval(timer);
      sentinel.current && intersectionObserver.unobserve(sentinel.current);
    };
  }, [load, noMore]);
  if (!noMore) {
    return <div ref={sentinel}>{children}</div>;
  }
  return null;
};
