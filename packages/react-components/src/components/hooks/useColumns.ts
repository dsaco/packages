import { useCallback, useEffect, useState } from 'react';

export function useColumns(widthColumn: number[][], defaultValue: number) {
  const match = useCallback(() => {
    const queries = widthColumn.map(([w]) => `(min-width: ${w}px)`);
    const values = widthColumn.map(([w, c]) => c);
    return (
      values[queries.findIndex((q) => matchMedia(q).matches)] || defaultValue
    );
  }, [widthColumn, defaultValue]);

  const [value, set] = useState(match);

  useEffect(() => {
    const handler = () => set(match);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return value;
}
