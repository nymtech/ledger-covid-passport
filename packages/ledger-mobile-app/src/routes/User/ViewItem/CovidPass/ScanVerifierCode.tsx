import * as React from 'react';
import { Box, Button, Grid } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { routes } from '../../../../Routes';
import { ScanQRCode } from '../../../../components/ScanQRCode';
import { useCoconutState } from '../../../../state';
import { useVerifierState } from '../../../../state/verifier';

export const CovidPassScanVerifier: React.FC = () => {
  const history = useHistory();
  const state = useCoconutState();
  const verifierState = useVerifierState();
  const handleSkip = React.useCallback(() => {
    const attr = {
      verifier_id: '1234',
      timestamp: new Date().toISOString(),
    };
    const policy = {
      is_vaccinated: true,
      is_over_18: true,
      is_over_21: false,
    };
    // set the state for the user app
    state.setVerifierAttributes(attr);
    state.setVerifierPolicy(policy);

    // set the same state for the verifier app, because it never produced the QR-code in the first place
    verifierState.setVerifierAttributes(attr);
    verifierState.setVerifierPolicy(policy);

    history.push(routes.user.app.view.covidPass.confirmVerifierCode);
  }, [state]);
  return (
    <Grid
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      mt={5}
      px={2}
    >
      <Grid
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <div>
          <Button
            sx={{ mx: 0, p: 0 }}
            to={routes.user.app.view.covidPass.home}
            component={Link}
          >
            <KeyboardArrowLeftIcon /> Back
          </Button>
        </div>
        <div>
          <Button sx={{ mx: 0, p: 0 }} onClick={handleSkip}>
            Skip <KeyboardArrowRightIcon />
          </Button>
        </div>
      </Grid>
      <h2>Scan Verifier Code</h2>
      <Box mt={2}>
        After scanning the verifier's code, you can choose to disclose
        information to them:
      </Box>
      <ScanQRCode
        onSuccess={() =>
          history.push(routes.user.app.view.covidPass.confirmVerifierCode)
        }
      />
    </Grid>
  );
};
