import { useCallback, useEffect, useState } from "react";

export const useStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState(() => {
    if (typeof window !== "undefined") {
      const storedValue = window.localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    }

    return initialValue;
  });

  useEffect(() => {
    const value = window.localStorage.getItem(key);

    if (!value) {
      window.localStorage.setItem(key, JSON.stringify(initialValue));
    }
  }, [initialValue, key]);

  const setStoredValue = useCallback((newValue: T) => {
    setValue(newValue);
    window.localStorage.setItem(key, JSON.stringify(newValue));
  }, []);

  return [value, setStoredValue] as const;
};
