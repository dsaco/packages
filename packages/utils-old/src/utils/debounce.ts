type DebounceOptions = {
  leading?: boolean;
  trailing?: boolean;
};

type DebouncedFunc<
  Args extends any[],
  F extends (...args: Parameters<F>) => any
> = {
  (this: ThisParameterType<F>, ...args: Args): void;
};

export function debounce<Args extends any[], F extends (...args: Args) => any>(
  func: F,
  wait = 0,
  options: DebounceOptions = {}
): DebouncedFunc<Args, F> {
  const { leading = false, trailing = true } = options;

  let lastCallTime: number;
  let timeoutId: ReturnType<typeof setTimeout>;
  wait = +wait || 0;

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }

  function debounced(this: ThisParameterType<F>, ...args: Args) {
    const time = Date.now();
    const isInvoking =
      lastCallTime === undefined || time - lastCallTime >= wait;

    lastCallTime = time;

    if (isInvoking && leading) {
      return func.apply(this, args);
    }
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  }

  return debounced;
}
