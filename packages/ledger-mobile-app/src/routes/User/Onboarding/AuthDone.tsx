import * as React from 'react';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import 'react-html5-camera-photo/build/css/index.css';
import { Link } from 'react-router-dom';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { routes } from '../../../Routes';
import { useOnboardingState } from '../../../state';

export const AuthDone: React.FC = () => {
  const onboardingState = useOnboardingState();
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      mt={5}
      px={4}
    >
      <CheckCircleIcon sx={{ mt: 3, color: 'green' }} />
      <Typography textAlign="center" mt={1} color="green" fontWeight="bold">
        We have downloaded your COVID certificate from the{' '}
        {onboardingState.country.healthAuthorityName}.
      </Typography>
      <Typography textAlign="center" mt={3}>
        If you want to look at your certificate, you can view the entire
        certificate.
      </Typography>
      <Typography textAlign="center" mt={3}>
        When you need to prove your vaccination status, the verifier will have a
        QR code for you to scan that will show you the data they wish to see
        before you agree to show a randomised Private Covid Certificate.
      </Typography>
      <Box mt={3}>
        <Button
          variant="contained"
          to={routes.user.app.view.covidPass.reveal}
          component={Link}
          sx={{ ml: 1, py: 2 }}
        >
          View COVID certificate
          <KeyboardArrowRightIcon />
        </Button>
      </Box>
    </Grid>
  );
};
