import * as React from 'react';
import { Box, Container } from '@material-ui/core';
import { lime } from '@material-ui/core/colors';
import { SwitchToVerifier } from '../AppModeSwitcher';
import { HeaderWithJustify } from '../Headers/HeaderWithJustify';
import { routes } from '../../Routes';
import { NavAwareDocs } from '../NavAwareDocs';
import { NavAwareStateViewer } from '../NavAwareStateViewer';

export const PatientBackground = lime.A200;

export const PatientContainer: React.FC = ({ children }) => {
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
          background: PatientBackground,
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
          <div>End user view</div>
          <SwitchToVerifier />
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
          }}
        >
          <NavAwareStateViewer />
        </Box>
      </Box>
    </Container>
  );
};
