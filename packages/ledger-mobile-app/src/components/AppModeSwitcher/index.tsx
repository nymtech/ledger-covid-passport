import * as React from 'react';
import { Button } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { useAppState } from '../StateProvider';

export const AppModeSwitcher: React.FC = () => {
  const state = useAppState();

  if (state.mode === 'patient') {
    return (
      <Button color="secondary" onClick={() => state.setMode('verifier')}>
        Switch to Verifier <KeyboardArrowRightIcon />
      </Button>
    );
  }

  return (
    <Button color="secondary" onClick={() => state.setMode('patient')}>
      Switch to Patient <KeyboardArrowRightIcon />
    </Button>
  );
};
