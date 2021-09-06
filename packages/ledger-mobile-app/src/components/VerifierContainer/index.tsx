import * as React from 'react';
import { Box, Container } from '@material-ui/core';
import { teal } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import { SwitchToPatient } from '../AppModeSwitcher';
import { HeaderWithJustify } from '../Headers/HeaderWithJustify';
import { routes } from '../../Routes';
import { NavAwareDocs } from '../NavAwareDocs';

export const VerifierBackground = teal.A200;

export const VerifierContainer: React.FC = ({ children }) => (
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
      <div>
        <div>
          <ul>
            <li>
              <Link to={routes.verifier.home}>Reset</Link>
            </li>
            <li>
              <Link to={routes.verifier.validate}>Scan QR Code</Link>
            </li>
            <li>
              <Link to={routes.verifier.view}>View certificate</Link>
            </li>
          </ul>
        </div>
        <NavAwareDocs />
      </div>
    </Box>
  </Container>
);
