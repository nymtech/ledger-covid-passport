import * as React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { routes } from '../../../Routes';
import { OnboardingDocuments } from './Documents';

export const Onboarding: React.FC = () => (
  <Grid
    container
    direction="column"
    justifyContent="center"
    alignItems="center"
    mt={5}
  >
    <Typography mb={3} variant="h4">
      Upload an Id
    </Typography>

    <OnboardingDocuments />

    <Box mt={4}>
      <Button
        variant="contained"
        color="success"
        to={routes.patient.onboardingUpload}
        component={Link}
        sx={{ py: 2 }}
      >
        Upload ID
        <KeyboardArrowRightIcon />
      </Button>
    </Box>
  </Grid>
);
