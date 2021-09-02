import * as React from 'react';
import {
  Box,
  Button,
  Chip,
  FormControlLabel,
  Grid,
  Switch,
} from '@material-ui/core';
import QRCode from 'react-qr-code';
import { Link } from 'react-router-dom';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import BeenhereOutlinedIcon from '@material-ui/icons/BeenhereOutlined';
import { DateTime } from 'luxon';
import { routes } from '../../../../Routes';

export const ViewCovidPassHome: React.FC = () => {
  const validUntil = React.useRef(DateTime.local().plus({ days: 30 }));
  return (
    <Grid
      direction="column"
      justifyContent="center"
      alignItems="center"
      mt={5}
      px={2}
    >
      <h2>Private COVID Certificate</h2>
      <Box>
        <Chip
          icon={<BeenhereOutlinedIcon />}
          label={`Valid until ${validUntil.current.toFormat('dd MMM yyyy')}`}
          color="success"
          sx={{ p: 1 }}
        />
        <Button
          sx={{ ml: 2 }}
          to={routes.user.app.view.covidPass.reveal}
          component={Link}
        >
          View <KeyboardArrowRightIcon />
        </Button>
      </Box>

      <Box mt={2}>
        You can control the information by only disclosing a subset of fields
        from your COVID certificate:
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
            to={routes.user.app.view.covidPass.newCustom}
            component={Link}
            sx={{ py: 2 }}
          >
            Create private certificate <KeyboardArrowRightIcon />
          </Button>
        </Box>
      </Grid>

      <Box mt={8}>
        Or you can scan a QR code from the verifier to provide the information
        they would like to see. You will be given a chance to confirm before
        disclosing information:
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
