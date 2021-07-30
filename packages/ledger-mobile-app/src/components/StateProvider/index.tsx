/* eslint-disable no-underscore-dangle */
import * as React from 'react';

export type AppMode = 'patient' | 'verifier';

export interface StateData {
  mode: AppMode;
}

export interface State extends StateData {
  setMode: (newMode: AppMode) => void;
}

const defaultValue: State = {
  mode: 'patient',
  setMode: () => undefined,
};

const AppStateContext = React.createContext<State>(defaultValue);

export const StateProvider: React.FC = ({ children }) => {
  const [data, setData] = React.useState<StateData>(defaultValue);
  const state: State = {
    mode: data.mode,
    setMode: (newMode: AppMode) =>
      setData((prevState) => ({ ...prevState, mode: newMode })),
  };
  return (
    <AppStateContext.Provider value={state}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => React.useContext(AppStateContext);
