/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import { HCertWrapper } from '../../models/hcert';

export type AppMode = 'patient' | 'verifier';

export interface StateData {
  mode: AppMode;
  qrCode?: string;
  hcert?: HCertWrapper;
}

export interface State extends StateData {
  setMode: (newMode: AppMode) => void;
  setQRCode: (url: string) => void;
  setHCert: (hcert: HCertWrapper) => void;
  clearQRCode: (url: string) => void;
}

const defaultValue: State = {
  mode: 'patient',
  setMode: () => undefined,
  setQRCode: () => undefined,
  setHCert: () => undefined,
  clearQRCode: () => undefined,
};

const AppStateContext = React.createContext<State>(defaultValue);

export const StateProvider: React.FC = ({ children }) => {
  const [data, setData] = React.useState<StateData>(defaultValue);
  const state: State = {
    mode: data.mode,
    qrCode: data.qrCode,
    hcert: data.hcert,
    setHCert: (hcert: HCertWrapper) =>
      setData((prevState) => ({ ...prevState, hcert })),
    setMode: (newMode: AppMode) =>
      setData((prevState) => ({ ...prevState, mode: newMode })),
    clearQRCode: () =>
      setData((prevState) => ({ ...prevState, qrCode: undefined })),
    setQRCode: (url) => setData((prevState) => ({ ...prevState, qrCode: url })),
  };
  return (
    <AppStateContext.Provider value={state}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => React.useContext(AppStateContext);
