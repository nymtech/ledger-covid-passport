import * as React from 'react';
import {
  Alert,
  Box,
  Button,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import QRCode from 'react-qr-code';
import QrCodeScannerIcon from '@material-ui/icons/QrCodeScanner';
import { routes } from '../../../Routes';
import { useVerifierState } from '../../../state/verifier';
import { VerifierAttributes, VerifierAccessControlPolicy } from 'coconut-wasm';

export interface ValidatorQRCode {
  verifierAttributes?: VerifierAttributes;
  verifierPolicy?: VerifierAccessControlPolicy;
}

export const VerifierShowVerificationQRCode: React.FC = () => {
  const state = useVerifierState();

  React.useEffect(() => {
    if (!state.verifierAttributes) {
      randomizeVerifierAttributes();
    }
    if (!state.verifierPolicy) {
      state.setVerifierPolicy({
        is_vaccinated: true,
        is_over_18: true,
        is_over_21: false,
      });
    }
  }, []);

  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          randomizeVerifierAttributes();
          return 0;
        }
        return Math.min(oldProgress + 1, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const contents: ValidatorQRCode = {
    verifierAttributes: state.verifierAttributes,
    verifierPolicy: state.verifierPolicy,
  };

  const verifierQRCodeContents = JSON.stringify(contents);

  const randomizeVerifierAttributes = () => {
    state.setVerifierAttributes({
      verifier_id: '1234',
      timestamp: new Date().toISOString(),
    });
  };

  if (!state.verifierPolicy) {
    return null;
  }

  return (
    <Grid
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      mt={5}
      px={2}
    >
      <Button sx={{ mx: 0, p: 0 }} to={routes.verifier.home} component={Link}>
        <KeyboardArrowLeftIcon /> Back
      </Button>
      <Paper elevation={3} sx={{ background: '#eee', mt: 2, p: 2 }}>
        <Box>
          <div>
            <strong>Ye Olde Cheshire Cheese</strong>
          </div>
          <div>145 Fleet St, London EC4A 2BU</div>
        </Box>
        <Typography mt={2} fontSize="smaller">
          wants to verify the following information without having you
          disclosing any personal information:
        </Typography>
      </Paper>
      <Box ml={2}>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
          color={(theme) => theme.palette.primary.dark}
        >
          <CheckBoxIcon sx={{ mr: 1 }} /> Vaccination Status
        </Box>
        {state.verifierPolicy.is_over_18 && !state.verifierPolicy.is_over_21 && (
          <Box
            mt={2}
            display="flex"
            alignItems="center"
            color={(theme) => theme.palette.primary.dark}
          >
            <CheckBoxIcon sx={{ mr: 1 }} /> Over 18 years old
          </Box>
        )}
        {state.verifierPolicy.is_over_21 && (
          <Box
            mt={2}
            display="flex"
            alignItems="center"
            color={(theme) => theme.palette.primary.dark}
          >
            <CheckBoxIcon sx={{ mr: 1 }} /> Over 21 years old
          </Box>
        )}
      </Box>
      <Box
        mt={4}
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <QRCode value={verifierQRCodeContents} />
        <LinearProgress variant="determinate" value={progress} sx={{ mt: 3 }} />
      </Box>
      <Box mt={2}>
        <Alert severity="info">
          <div>Open your PCC app and tap the</div>
          <Box display="flex" alignItems="center" flexDirection="row">
            <QrCodeScannerIcon fontSize="inherit" />
            <Box ml={1}>
              <strong>Show PCC</strong>
            </Box>
          </Box>
          <div>button, and scan the QR code below.</div>
        </Alert>
      </Box>
    </Grid>
  );
};
