import * as React from 'react';
import { Box } from '@material-ui/core';
import { AppNav } from './Nav';

export const AppLayout: React.FC = ({ children }) => (
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    }}
  >
    <Box
      sx={{
        flexGrow: 1,
        overflowY: 'auto',
        height: '100%',
        width: '100%',
      }}
    >
      {children}
    </Box>
    <AppNav />
  </Box>
);
