import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { routes } from '../../Routes';
import { VerifierLayout as Layout } from '../../layouts/DefaultLayout';
import { useVerifierState } from '../../state/verifier';

export const VerifierUrlPaths = {
  home: '/verifier',
};

export const VerifierRoutes: React.FC = () => {
  const state = useVerifierState();
  return (
    <Layout>
      <Switch>
        <Route exact path={VerifierUrlPaths.home}>
          <Box p={2}>
            <Typography mx={2} my={8} variant="h3">
              Verify
              <br />
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
            >
              {state.verifierPolicy && state.verifierAttributes ? (
                <Button
                  variant="contained"
                  to={routes.verifier.scanQRCode}
                  component={Link}
                  sx={{ py: 2, mt: 3 }}
                >
                  Verify PCC
                  <KeyboardArrowRightIcon />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  to={routes.verifier.validate}
                  component={Link}
                  sx={{ py: 2, mt: 3 }}
                >
                  Start
                  <KeyboardArrowRightIcon />
                </Button>
              )}
            </Grid>
          </Box>
        </Route>
      </Switch>
    </Layout>
  );
};
