import * as React from 'react';
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { useHistory } from 'react-router-dom';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { routes } from '../../../../Routes';

export const UploadVerify: React.FC = () => {
  const randomNumber = React.useRef(
    Array.from({ length: 4 }, (_) => Math.floor(Math.random() * 9 + 1)).join(
      '',
    ),
  );
  const [uploading, setUploading] = React.useState(false);
  const history = useHistory();

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      mt={5}
      px={4}
    >
      <Typography mt={4} textAlign="center">
        Please record a video saying the following numbers clearly:
      </Typography>
      <Typography
        mt={4}
        textAlign="center"
        fontSize="4rem"
        fontFamily="monospace"
      >
        {randomNumber.current}
      </Typography>
      <Box mt={2} className="nym-camera">
        <Camera isFullscreen={false} idealFacingMode="environment" />
      </Box>
      {uploading && (
        <Box sx={{ mt: 6, width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      <Box>
        <Button
          sx={{ mt: 5 }}
          variant="contained"
          disabled={uploading}
          onClick={() => {
            setUploading(true);
            setTimeout(() => {
              history.push(routes.uk.patient.onboardingUploadWait);
            }, 3000);
          }}
        >
          Upload video <KeyboardArrowRightIcon />
        </Button>
      </Box>
    </Grid>
  );
};
