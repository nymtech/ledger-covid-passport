import * as React from 'react';
import { StateProvider } from './components/StateProvider';
import { Routes } from './Routes';
import { useUnload } from './hooks/useUnload';
import { useCoconutState } from './state';

export const App: React.FC = () => {
  const state = useCoconutState();
  useUnload(() => {
    // free the WASM app before the window unloads
    state.app.free();
  });
  React.useEffect(() => {
    (async () => {
      const keys = await state.app.get_validator_keys();
    })();
  }, []);
  return (
    <StateProvider>
      <Routes />
    </StateProvider>
  );
};
