import * as React from 'react';
import { Box, Container } from '@material-ui/core';
import { lime } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import { SwitchToVerifier } from '../AppModeSwitcher';
import { HeaderWithJustify } from '../Headers/HeaderWithJustify';
import { routes } from '../../Routes';
import { NavAwareDocs } from '../NavAwareDocs';

export const PatientBackground = lime.A200;

export const PatientContainer: React.FC = ({ children }) => (
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
      <div>
        <NavAwareDocs />
      </div>
    </Box>
  </Container>
);

/*
        <div>
          <h3>Nym Passport App</h3>
          <ul>
            <li>
              <Link to={routes.user.home}>Reset</Link>
            </li>
            <li>
              <Link to={routes.user.app.home}>App home</Link>
            </li>
            <li>
              View
              <ul>
                <li>
                  <Link to={routes.user.app.view.nymPassport}>
                    Nym passport
                  </Link>
                </li>
                <li>
                  <Link to={routes.user.app.view.covidPass.home}>
                    Private COVID Certificate
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <h3>UK NHS App Style Flow</h3>
          <ul>
            <li>
              <Link to={routes.uk.patient.home}>Reset</Link>
            </li>
            <li>
              <Link to={routes.uk.patient.onboarding}>Onboarding</Link>
            </li>
            <li>
              <Link to={routes.uk.patient.onboardingUpload}>
                Onboarding : Upload
              </Link>
            </li>
            <li>
              <Link to={routes.uk.patient.onboardingUploadVerify}>
                Onboarding : Upload Verify
              </Link>
            </li>
            <li>
              <Link to={routes.uk.patient.certificate}>Certificate</Link>
            </li>
          </ul>
        </div>

 */
