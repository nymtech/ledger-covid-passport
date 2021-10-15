import * as React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import 'react-html5-camera-photo/build/css/index.css';
import { Link, useHistory } from 'react-router-dom';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { routes } from '../../../Routes';
import { useAppState } from '../../../components/StateProvider';

export const AuthWait: React.FC = () => {
  const [progress, setProgress] = React.useState('Please wait...');
  const history = useHistory();
  React.useEffect(() => {
    setTimeout(() => {
      setProgress('Checking details...');
    }, 1500);
    setTimeout(() => {
      setProgress('Getting COVID vaccination certificate...');
    }, 3000);
    setTimeout(() => {
      setProgress('Done!');
    }, 5000);
    setTimeout(() => {
      history.push(routes.user.onboarding.onboardingAuthDone);
    }, 6000);
  }, []);
  return (
    <Grid
      height="100%"
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      px={4}
    >
      <CircularProgress />
      <Typography mt={2} textAlign="center">
        {progress}
      </Typography>
    </Grid>
  );
};
