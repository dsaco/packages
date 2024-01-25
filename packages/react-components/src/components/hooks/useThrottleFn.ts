// type UseThrottleFn

import { useEffect, useRef } from 'react';

export function useThrottleFn<T, U extends any[]>(
  fn: (...args: U) => T,
  ms = 200
) {
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    console.log('');
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(timeout.current);
    };
  }, []);
}

type ThrottleOptions = {
  leading?: boolean;
  trailing?: boolean;
};
type Throttle = (
  func: () => void,
  wait?: number,
  options?: ThrottleOptions
) => void;

export const throttle: Throttle = (func, wait = 0, options = {}) => {
  const { leading = true, trailing = true } = options;
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }
};
