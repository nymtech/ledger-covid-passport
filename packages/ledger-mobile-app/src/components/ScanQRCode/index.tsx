import * as React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { QrReader } from '@blackbox-vision/react-qr-reader';
import { useAppState } from '../StateProvider';
import { routes } from '../../Routes';
import { useIsMounted } from '../../hooks/useIsMounted';

export const ScanQRCode: React.FC = () => {
  const videoId = React.useRef(`video-${new Date().toISOString()}`);
  const state = useAppState();
  const [validQRCode, setValidQRCode] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>();
  const history = useHistory();
  const isMounted = useIsMounted();

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      mt={5}
      px={4}
    >
      <Typography variant="h6" mt={2} align="center">
        Scan a QR code
      </Typography>
      {!validQRCode && (
        <>
          <QrReader
            videoId={videoId.current}
            constraints={{ facingMode: 'environment' }}
            onResult={(result, error) => {
              if (result) {
                if (isMounted()) {
                  setValidQRCode(true);
                  setValue(result.getText());
                }
                state.setQRCode(result.getText());
                setTimeout(() => {
                  history.push(routes.verifier.view);
                }, 4000);
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
      {validQRCode && (
        <Box sx={{ p: 4, bgcolor: 'green', color: 'white' }}>
          <div>Valid QR Code Found</div>
          <div>
            <pre>{value}</pre>
          </div>
          <Button
            color="warning"
            variant="contained"
            onClick={() => {
              if (value) {
                state.setQRCode(value);
                history.push(routes.verifier.view);
              }
            }}
          >
            See certificate
          </Button>
        </Box>
      )}
    </Grid>
  );
};
