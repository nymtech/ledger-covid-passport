import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { routes } from '../../Routes';
import { PatientLayout as Layout } from '../../layouts/DefaultLayout';

export const PatientUrlPaths = {
  home: '/patient',
};

export const PatientRoutes: React.FC = () => (
  <Layout>
    <Switch>
      <Route exact path={PatientUrlPaths.home}>
        <Box p={2}>
          <Typography my={8} variant="h3">
            Private
            <br />
            COVID
            <br />
            Certificate
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
              to={routes.patient.onboarding}
              component={Link}
              sx={{ py: 2 }}
            >
              Log in with your unique id
              <KeyboardArrowRightIcon />
            </Button>
          </Grid>
        </Box>
      </Route>
    </Switch>
  </Layout>
);
