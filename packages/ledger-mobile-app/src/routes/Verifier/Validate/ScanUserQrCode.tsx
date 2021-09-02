import * as React from 'react';
import { Button, Grid } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { ScanQRCode } from '../../../components/ScanQRCode';
import { routes } from '../../../Routes';

export const ScanUserQrCode: React.FC = () => {
  const history = useHistory();
  return (
    <Grid
      direction="column"
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
        <div>
          <Button
            sx={{ mx: 0, p: 0 }}
            to={routes.verifier.validateSuccess}
            component={Link}
          >
            Skip <KeyboardArrowRightIcon />
          </Button>
        </div>
      </Grid>
      <h2>Scan QR Code</h2>
      <ScanQRCode
        onSuccess={() => history.push(routes.verifier.validateSuccess)}
      />
    </Grid>
  );
};
