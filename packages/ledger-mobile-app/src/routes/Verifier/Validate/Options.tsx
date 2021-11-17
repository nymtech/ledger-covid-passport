import * as React from 'react';
import { Box, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { routes } from '../../../Routes';

export const VerifierOptions: React.FC = () => (
  <Grid
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    mt={5}
    px={2}
  >
    <Grid
      display="flex"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
    >
      <div>
        <Button
          sx={{ mx: 0, p: 0 }}
          to={routes.verifier.validate}
          component={Link}
        >
          <KeyboardArrowLeftIcon /> Back
        </Button>
      </div>
    </Grid>
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      mt={5}
    >
      <Button
        variant="contained"
        to={routes.verifier.scanQRCode}
        component={Link}
        sx={{ py: 2, mt: 3 }}
      >
        Verify PCC
        <KeyboardArrowRightIcon />
      </Button>
      <Button
        variant="contained"
        to={routes.verifier.showQRCode}
        component={Link}
        sx={{ py: 2, mt: 3 }}
      >
        Display venue QR Code
        <KeyboardArrowRightIcon />
      </Button>
    </Grid>
  </Grid>
);
