import * as React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Theme,
  Typography,
  useTheme,
} from '@material-ui/core';
import 'react-html5-camera-photo/build/css/index.css';
import './html5-camera.css';
import { Link } from 'react-router-dom';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useRef } from 'react';
import { routes } from '../../../Routes';
import { useIsMounted } from '../../../hooks/useIsMounted';

const IMPATIENCE_THRESHOLD = 16;

export const UploadPleaseWait: React.FC = () => {
  const theme: Theme = useTheme();
  const isMounted = useIsMounted();
  const [estimatedTime, setEstimateTime] = React.useState(24);
  const timer = useRef<any>(null);
  React.useEffect(() => {
    timer.current = setInterval(() => {
      if (isMounted()) {
        setEstimateTime((prevState) => prevState - 1);
      }
    }, 300);

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, []);
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      mt={5}
      px={4}
    >
      <Box mt={4} />
      {estimatedTime > 0 ? (
        <Typography textAlign="center">
          Please wait while we verify your details. This could take up to 24
          hours.
        </Typography>
      ) : (
        <>
          <div>
            <CheckCircleIcon color="success" sx={{ fontSize: 60 }} />
          </div>
          <Typography textAlign="center">
            We have verified your details and your certificate is ready to view.
          </Typography>
        </>
      )}
      {estimatedTime > 0 && (
        <>
          <Box mt={6}>
            <CircularProgress
              variant="determinate"
              value={100 - (estimatedTime * 100) / 24}
            />
          </Box>
          <Box mt={1} mb={2}>
            <Typography textAlign="center" color={theme.palette.primary.main}>
              Estimated wait time: {estimatedTime} hours...
            </Typography>
          </Box>
        </>
      )}
      <Button
        sx={{ mt: 5 }}
        variant="contained"
        to={routes.patient.certificate}
        component={Link}
        disabled={estimatedTime > IMPATIENCE_THRESHOLD}
      >
        View certificate <KeyboardArrowRightIcon />
      </Button>
      {estimatedTime < IMPATIENCE_THRESHOLD && estimatedTime > 0 && (
        <Box>
          <Typography
            textAlign="center"
            color={theme.palette.grey['500']}
            mt={2}
          >
            Ok you have watched enough of the countdown, so just skip it now!
          </Typography>
        </Box>
      )}
    </Grid>
  );
};
