import { useState } from 'react';

export const useLatestState = <T>(initialState: T) => {
  const [state, setState] = useState<T>(initialState);
  const getLatestState = () => {
    return new Promise<T>((resolve) => {
      setState((s) => {
        resolve(s);
        return s;
      });
    });
  };

  return [state, setState, getLatestState] as const;
};
