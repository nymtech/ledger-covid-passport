import * as React from 'react';
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Switch,
  Typography,
} from '@material-ui/core';
import QRCode from 'react-qr-code';
import { Link } from 'react-router-dom';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { routes } from '../../../../Routes';
import { useAppState } from '../../../../components/StateProvider';
import { HCertValidity } from '../../../../components/HealthCertificate/HCertValidity';

export const ViewCovidPassHome: React.FC = () => {
  const state = useAppState();
  return (
    <Grid
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      mt={5}
      px={2}
    >
      <h2>Private COVID Certificate</h2>
      <Box mt={3} mb={3}>
        You have downloaded a COVID certificate into your wallet.
      </Box>
      <Box>
        <HCertValidity wrapper={state.hcert} />
        <Button
          sx={{ ml: 2 }}
          to={routes.user.app.view.covidPass.reveal}
          component={Link}
        >
          View
          <KeyboardArrowRightIcon />
        </Button>
      </Box>

      <Typography
        mt={8}
        mb={3}
        fontWeight="bold"
        fontSize="larger"
        textAlign="center"
      >
        Show your Private COVID Certificate to a verifier
      </Typography>

      <Box>
        Scan a QR code from the verifier to provide the information they would
        like to see. You will be given a chance to confirm before disclosing
        information:
      </Box>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        mt={2}
        width="100%"
      >
        <Box>
          <Button
            variant="contained"
            to={routes.user.app.view.covidPass.scanVerifierCode}
            component={Link}
            sx={{ py: 2 }}
          >
            Scan verifier code <KeyboardArrowRightIcon />
          </Button>
        </Box>
      </Grid>

      {false && (
        <>
          <Box>Choose the information you want to disclose:</Box>
          <Box mt={2}>
            <FormControlLabel
              control={<Switch checked />}
              label="Vaccination Status"
            />
          </Box>
          <Box mt={2}>
            <FormControlLabel control={<Switch />} label="Date of birth" />
          </Box>
          <Box mt={2}>
            <FormControlLabel control={<Switch />} label="Your full name" />
          </Box>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            mt={2}
            width="100%"
          >
            <Box mt={4}>
              <Button
                color="success"
                variant="contained"
                to={routes.user.app.home}
                component={Link}
              >
                Create private certificate <KeyboardArrowRightIcon />
              </Button>
            </Box>
            <Box mt={6} fontSize="smaller">
              {`The verifier may have QR code for you to scan that will generate a new
        private certificate based on information they require. Scan the
        verifier's QR code and then choose if you want to disclose information
        to them in a new certificate:`}
            </Box>
            <Box mt={4}>
              <Button
                variant="contained"
                to={routes.user.app.home}
                component={Link}
              >
                Scan verifier request <KeyboardArrowRightIcon />
              </Button>
            </Box>
          </Grid>
        </>
      )}
      {false && (
        <>
          <Box mt={4} fontSize="smaller">
            You can show the following QR code for verification and only the
            information you chose above will be disclosed
          </Box>

          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            mt={2}
            width="100%"
          >
            <Box mt={2}>
              <QRCode value="private COVID cert private COVID cert private COVID cert private COVID cert private COVID cert private COVID cert private COVID cert private COVID cert private COVID cert" />
            </Box>
          </Grid>
        </>
      )}
    </Grid>
  );
};
