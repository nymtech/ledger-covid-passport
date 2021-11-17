import * as React from 'react';

type BeforeUnloadEventFn = (ev: BeforeUnloadEvent) => void;

export const useUnload = (fn: BeforeUnloadEventFn) => {
  const cb = React.useRef(fn);
  React.useEffect(() => {
    const onUnload = cb.current;
    window.addEventListener('beforeunload', onUnload);
    return () => {
      window.removeEventListener('beforeunload', onUnload);
    };
  }, [cb]);
};
