import * as React from 'react';
import { Box, Container } from '@material-ui/core';
import { teal } from '@material-ui/core/colors';
import { SwitchToPatient } from '../AppModeSwitcher';
import { HeaderWithJustify } from '../Headers/HeaderWithJustify';
import { routes } from '../../Routes';
import { NavAwareDocs } from '../NavAwareDocs';
import { NavAwareStateViewer } from '../NavAwareStateViewer';

export const VerifierBackground = teal.A200;

export const VerifierContainer: React.FC = ({ children }) => {
  return (
    <Container>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: '600px',
        }}
      >
        <Box sx={{ p: 4 }}>{children}</Box>
      </Box>
      <Box
        sx={{
          bgcolor: VerifierBackground,
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          width: 'calc(100vw - 600px)',
          overflowY: 'auto',
          py: 2,
          px: 4,
        }}
      >
        <HeaderWithJustify>
          <div>Verifier view</div>
          <SwitchToPatient />
        </HeaderWithJustify>
        <div id="nav-aware-docs-container">
          <NavAwareDocs />
        </div>
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            right: 0,
          }}>
          <NavAwareStateViewer />
        </Box>
      </Box>
    </Container>
  );
};
