import { useEffect, useState } from "react";

export const useDebounce = <T = any>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  // eslint-disable-next-line no-undef
  let handler: NodeJS.Timeout;
  useEffect(() => {
    clearTimeout(handler);
    handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};
