import * as React from 'react';
import { Button, Grid } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { ScanQRCode } from '../../../components/ScanQRCode';
import { routes } from '../../../Routes';
import { useVerifierState } from '../../../state/verifier';
import { useCoconutState } from '../../../state';

export const ScanUserQrCode: React.FC = () => {
  const history = useHistory();
  const coconutState = useCoconutState();
  const state = useVerifierState();
  const [retry, setRetry] = React.useState(new Date().toISOString());

  React.useEffect(() => {
    // reset on mounting
    coconutState.clearUserShowDataBase58();
  }, []);

  const verify = React.useCallback( () => {
    if (!coconutState.userShowDataBase58 || !state.verifierAttributes || !state.verifierPolicy) {
      console.warn('ScanUserQrCode: State is not set', {
        userShowDataBase58: coconutState.userShowDataBase58,
        verifierAttributes: state.verifierAttributes,
        verifierPolicy: state.verifierPolicy,
      });
      setTimeout(() => setRetry(new Date().toISOString()), 500);
      return;
    }

    (async () => {
      if (
        !coconutState.userShowDataBase58 ||
        !state.verifierPolicy ||
        !state.verifierAttributes
      ) {
        console.warn('ScanUserQrCode: State is not set, before verifying credential', {
          userShowDataBase58: coconutState.userShowDataBase58,
          verifierAttributes: state.verifierAttributes,
          verifierPolicy: state.verifierPolicy,
        });
        return;
      }
      const result = await coconutState.app.verify_coconut_credential(
        state.verifierPolicy,
        state.verifierAttributes,
        coconutState.userShowDataBase58,
      );
      state.setVerifyResult(result);
      history.push(routes.verifier.validateSuccess);
    })();
  }, [coconutState.userShowDataBase58, state.verifierAttributes, state.verifierPolicy]);

  React.useEffect(() => {
    console.info('Retrying...');
    verify();
  }, [retry]);

  const handleSkip = () => {
    verify();
  };

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
          <Button sx={{ mx: 0, p: 0 }} onClick={handleSkip}>
            Skip <KeyboardArrowRightIcon />
          </Button>
        </div>
      </Grid>
      <h2>Scan QR Code</h2>
      <ScanQRCode
        onSuccess={(value) => {
          coconutState.setUserShowDataBase58(value);
          verify();
        }}
      />
    </Grid>
  );
};
