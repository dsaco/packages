import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

export type UseIntersectionRef<E extends Element = Element> = (
  element: E
) => void;

export type UseIntersectionFn = () => void;
export type UseIntersectionResult<E extends Element = Element> = [
  UseIntersectionRef<E>
];

export function useIntersection<E extends Element = Element>(
  fn: UseIntersectionFn
): UseIntersectionResult<E> {
  const [element, ref] = useState<Element | null>(null);

  const observer = useMemo(
    () =>
      new IntersectionObserver((entires) => {
        console.log(entires[0]);
        if (entires[0]?.isIntersecting) {
          fn?.();
        }
      }),
    []
  );

  useLayoutEffect(() => {
    if (!element) {
      return;
    }
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [element]);

  return [ref];
}
