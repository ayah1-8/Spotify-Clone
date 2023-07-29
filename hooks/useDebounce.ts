import { useEffect, useState } from 'react';

//EXAMPLE:to have a delay after the user stops typing to return certain result
//debounces value
function useDebounce<T>(value: T, delay?: number): T {
  const [debounceValue, setDebounceValue] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceValue;
}

export default useDebounce;
