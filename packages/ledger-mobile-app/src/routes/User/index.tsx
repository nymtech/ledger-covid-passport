import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { routes } from '../../Routes';
import { PatientLayout as Layout } from '../../layouts/DefaultLayout';
import { OnboardingRoutes, OnboardingUrlPaths } from './Onboarding';
import { AppRoutes, AppUrlPaths } from './App';
import { ViewItemUrlPaths } from './ViewItem';

export const UserUrlPaths = {
  home: '/user',
  onboarding: {
    ...OnboardingUrlPaths,
  },
  app: {
    ...AppUrlPaths,
    view: {
      ...ViewItemUrlPaths,
    },
  },
};

export const UserRoutes: React.FC = () => (
  <Layout>
    <Switch>
      <Route exact path={UserUrlPaths.home}>
        <SplashScreen />
      </Route>
      <Route path={OnboardingUrlPaths.home}>
        <OnboardingRoutes />
      </Route>
      <Route path={AppUrlPaths.home}>
        <AppRoutes />
      </Route>
    </Switch>
  </Layout>
);

const SplashScreen: React.FC = () => (
  <Box p={2}>
    <Typography mx={2} my={8} variant="h3">
      Nym
      <br />
      Private
      <br />
      Identity
      <br />
      App
    </Typography>

    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      height="30vh"
    >
      <Button
        variant="contained"
        to={routes.user.onboarding.home}
        component={Link}
        sx={{ py: 2 }}
      >
        Get started
        <KeyboardArrowRightIcon />
      </Button>
    </Grid>
  </Box>
);
