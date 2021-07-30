import * as React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import QrScanner from 'qr-scanner';
import { VideoHTMLAttributes } from 'react';
import { useAppState } from '../StateProvider';

const Video = React.forwardRef<
  HTMLVideoElement,
  VideoHTMLAttributes<HTMLVideoElement>
>((props, ref) => (
  // eslint-disable-next-line jsx-a11y/media-has-caption
  <video ref={ref} {...props} />
));

export const ScanQRCode: React.FC = () => {
  const state = useAppState();
  const video = React.useRef<HTMLVideoElement>(null);
  const scanner = React.useRef<QrScanner>();
  const [validQRCode, setValidQRCode] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>();

  React.useEffect(() => {
    if (!video.current) {
      return;
    }

    scanner.current = new QrScanner(
      video.current,
      (result) => {
        console.log('scanner decode', result);
        setValidQRCode(true);
        scanner.current?.destroy();
        setValue(result);
        setTimeout(() => state.setQRCode(result), 2000);
      },
      () => undefined,
      400,
      'user',
    );
    scanner.current?.start();

    return () => {
      scanner.current?.destroy();
    };
  }, [video.current]);

  return (
    <Box
      sx={{
        px: 3,
        py: 4,
      }}
    >
      <Typography variant="h6" mt={2} align="center">
        Scan a QR code
      </Typography>
      {!validQRCode && <Video ref={video} style={{ width: '100%' }} />}
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
              }
            }}
          >
            See certificate
          </Button>
        </Box>
      )}
    </Box>
  );
};
