import { useEffect, useState } from "react";

/** State synced to localStorage under `key`. Falls back to `initialValue` when unavailable. */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // localStorage unavailable (private mode, quota, etc.) — fail silently
    }
  }, [key, value]);

  return [value, setValue] as const;
}
