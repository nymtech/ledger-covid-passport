import * as React from 'react';
import { Box, CircularProgress, Grid, Typography } from '@material-ui/core';
import { QrReader } from '@blackbox-vision/react-qr-reader';
import { useIsMounted } from '../../hooks/useIsMounted';

interface ScanQRCodeProps {
  onSuccess: (value: string) => void;
}

export const ScanQRCode: React.FC<ScanQRCodeProps> = ({ onSuccess }) => {
  const videoId = React.useRef(`video-${new Date().toISOString()}`);
  const [validQRCode, setValidQRCode] = React.useState<boolean>(false);
  const isMounted = useIsMounted();

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      {!validQRCode && (
        <>
          <QrReader
            videoId={videoId.current}
            constraints={{ facingMode: 'environment' }}
            onResult={(result, error) => {
              if (result) {
                if (isMounted()) {
                  setValidQRCode(true);
                  onSuccess(result.getText());
                }
              }
            }}
            containerStyle={{ width: '100%' }}
          />
          <Box mt={1}>
            <CircularProgress />
          </Box>
          <Typography color="#aaa">Searching for a valid QR code...</Typography>
        </>
      )}
    </Grid>
  );
};
