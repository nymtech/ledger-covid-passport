import * as React from 'react';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Grid,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import QRCode from 'react-qr-code';
import { routes } from '../../../../Routes';
import { useCoconutState } from '../../../../state';

export const CovidPassShowPrivate: React.FC = () => {
  const state = useCoconutState();
  const [busy, setBusy] = React.useState<boolean>(false);

  const randomiseCredential = React.useCallback(() => {
    setBusy(true);
    setTimeout(() => {
      (async () => {
        if(state.verifierAttributes) {
          const userShowDataBase58 = await state.app.show_coconut_credential(
            state.verifierAttributes,
          );
          state.setUserShowDataBase58(userShowDataBase58);
        }
        setBusy(false);
      })();
    }, 100);
  }, [state]);

  React.useEffect(() => {
    if (
      !state.userShowDataBase58 &&
      state.signatureWithShares &&
      state.verifierAttributes &&
      state.verifierPolicy
    ) {
      randomiseCredential();
    }
  }, [
    state.verifierAttributes,
    state.verifierPolicy,
    state.signatureWithShares,
    state.userShowDataBase58,
  ]);

  if (
    !state.verifierAttributes ||
    !state.verifierPolicy ||
    !state.signatureWithShares
  ) {
    return (
      <Grid
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mt={5}
        px={2}
      >
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {!state.signatureWithShares && <p>Sorry, you do not seem to have a valid credential signature. Please get a new credential from your health authority.</p>}
          {(!state.verifierAttributes || !state.verifierPolicy) && <p>Sorry we do not have any information about the verifier. Please go back and try scan a QR code again.</p>}
        </Alert>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          mt={6}
          width="100%"
        >
          <Button
            variant="contained"
            to={routes.user.app.home}
            component={Link}
            sx={{ mx: 1, py: 2 }}
          >
            <KeyboardArrowLeftIcon /> Back
          </Button>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      mt={5}
      px={2}
    >
      <Button
        sx={{ mx: 0, p: 0 }}
        to={routes.user.app.view.covidPass.home}
        component={Link}
      >
        <KeyboardArrowLeftIcon /> Back
      </Button>
      <h2>Your Private COVID Pass</h2>
      <Box my={5}>
        {!state.userShowDataBase58 && (
          <Grid display="flex" alignItems="center" my={10}>
            <div>
              <CircularProgress color="inherit" size={25} sx={{ mr: 2 }} />
            </div>
            <div>Please wait...</div>
          </Grid>
        )}
        {state.userShowDataBase58 && (
          <QRCode value={state.userShowDataBase58} />
        )}
      </Box>
      {state.userShowDataBase58 && (
        <Button
          variant="contained"
          sx={{ mt: 2, height: 50 }}
          onClick={randomiseCredential}
          disabled={busy}
        >
          {busy ? (
            <>
              <CircularProgress color="inherit" size={25} sx={{ mr: 2 }} />
              Please wait
            </>
          ) : (
            'Re-randomise'
          )}
        </Button>
      )}
    </Grid>
  );
};
