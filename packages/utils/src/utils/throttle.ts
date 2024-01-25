type ThrottleOptions = {
  leading?: boolean;
  trailing?: boolean;
};

type ThrottleFunc<Args extends any[], F extends (...args: Args) => any> = {
  (this: ThisParameterType<F>, ...args: Args): void;
};

export function throttle<Args extends any[], F extends (...args: Args) => any>(
  func: F,
  wait = 0,
  options: ThrottleOptions = {}
): ThrottleFunc<Args, F> {
  const { leading = false, trailing = false } = options;

  let lastCallTime: number;
  let lastInvokeTime: number;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  wait = +wait || 0;

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }

  function throttled(this: ThisParameterType<F>, ...args: Args) {
    const time = Date.now();

    const isInvoking =
      lastInvokeTime === undefined || time - lastInvokeTime >= wait;

    if (isInvoking) {
      lastInvokeTime = time;
      clearTimeout(timeoutId);
      return func.apply(this, args);
    }
    if (trailing && timeoutId === undefined) {
      timeoutId = setTimeout(() => {
        lastInvokeTime = Date.now();
        timeoutId = undefined;
        func.apply(this, args);
      }, wait - (time - lastInvokeTime));
    }
  }
  return throttled;
}
