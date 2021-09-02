import * as React from 'react';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { QrReader } from '@blackbox-vision/react-qr-reader';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import { useAppState } from '../../../components/StateProvider';
import { useIsMounted } from '../../../hooks/useIsMounted';
import { routes } from '../../../Routes';
import { decodeCovidCertificate } from '../../../utils/covid-certificate-decoder';

export const AddCovidPass: React.FC = () => {
  const videoId = React.useRef(`video-${new Date().toISOString()}`);
  const state = useAppState();
  const [value, setValue] = React.useState<string>();
  const [certificate, setCertificate] = React.useState<any>(null);
  const [error, setError] = React.useState<Error>();
  const history = useHistory();
  const isMounted = useIsMounted();

  React.useEffect(() => {
    if (value) {
      decodeCovidCertificate(value).then(setCertificate).catch(setError);
    }
  }, [value]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      mt={5}
      px={4}
    >
      <Box width="100%">
        <Button sx={{ mx: 0, p: 0 }} to={routes.user.app.home} component={Link}>
          <KeyboardArrowLeftIcon /> Back
        </Button>
      </Box>

      <h2 style={{ width: '100%' }}>Scan a QR code</h2>
      {!value && (
        <>
          <QrReader
            videoId={videoId.current}
            constraints={{ facingMode: 'environment' }}
            onResult={(result, error) => {
              if (result) {
                if (isMounted()) {
                  setValue(result.getText());
                }
              }
            }}
            containerStyle={{ width: '100%' }}
          />
          <Box mt={2}>
            <CircularProgress />
          </Box>
          <Typography color="#aaa">Searching for a valid QR code...</Typography>
        </>
      )}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          <AlertTitle>Oh no! Something went wrong.</AlertTitle>
          <div>{error.message}</div>
          <Box mt={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setValue(undefined);
                setError(undefined);
              }}
            >
              Try again
            </Button>
          </Box>
        </Alert>
      )}
      {!error && value && !certificate && (
        <>
          <Box mt={2}>
            <CircularProgress />
          </Box>
          <Typography color="#aaa">Processing QR code data...</Typography>
        </>
      )}
      {certificate && (
        <Box mt={2} maxWidth="100%">
          <Box>Found valid certificate</Box>
          <Box sx={{ overflowX: 'auto' }}>
            <pre>{JSON.stringify(certificate, null, 2)}</pre>
          </Box>
        </Box>
      )}
    </Grid>
  );
};
