import * as React from 'react';
import { StateProvider } from './components/StateProvider';
import { Routes } from './Routes';

export const App: React.FC = () => (
  <StateProvider>
    <Routes />
  </StateProvider>
);
