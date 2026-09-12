import { type SetStateAction, useCallback, useState } from "react";

function readValue<T>(key: string, initialValue: T): T {
  if (typeof window === "undefined") {
    return initialValue;
  }

  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue === null ? initialValue : (JSON.parse(storedValue) as T);
  } catch {
    return initialValue;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => readValue(key, initialValue));

  const setStoredValue = useCallback(
    (nextValue: SetStateAction<T>) => {
      setValue(currentValue => {
        const resolvedValue = nextValue instanceof Function ? nextValue(currentValue) : nextValue;

        try {
          window.localStorage.setItem(key, JSON.stringify(resolvedValue));
        } catch {
          // The application still works if storage is unavailable or full.
        }

        return resolvedValue;
      });
    },
    [key],
  );

  return [value, setStoredValue] as const;
}
