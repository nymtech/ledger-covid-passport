import * as React from 'react';
import { Box, Button, Grid, TextField } from '@material-ui/core';
import 'react-html5-camera-photo/build/css/index.css';
import { Link, useHistory } from 'react-router-dom';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { routes } from '../../../Routes';
import { useOnboardingState } from '../../../state';

export const AuthStart: React.FC = () => {
  const onboardingState = useOnboardingState();
  const history = useHistory();
  return (
    <Grid container mt={5} px={4}>
      <Box mt={3}>
        Login with your {onboardingState.country.healthAuthorityName}{' '}
        credentials
      </Box>
      <Box
        mt={3}
        component="form"
        onSubmit={() =>
          history.push(routes.user.onboarding.onboardingAuthPleaseWait)
        }
      >
        <Box>
          <TextField
            autoFocus
            required
            helperText={`Enter your ${onboardingState.country.uniqueIdentifierName}`}
          />
        </Box>
        <Box mt={3}>
          <Button type="submit" variant="contained" sx={{ ml: 1, py: 2 }}>
            Next
            <KeyboardArrowRightIcon />
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};
