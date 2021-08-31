import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { VerifierLayout as Layout } from '../../../layouts/DefaultLayout';
import { VerifierViewContainer } from '../../../components/VerifierViewContainer';
import { VerifierBottomNav } from '../../../components/Navs/VerifierBottomNav';

export const ViewUrlPaths = {
  view: '/verifier/view',
};

export const ValidatorViewRoutes: React.FC = () => (
  <Layout>
    <Switch>
      <Route path={ViewUrlPaths.view}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              height: '100%',
            }}
          >
            <VerifierViewContainer />
          </Box>
          <VerifierBottomNav />
        </Box>
      </Route>
    </Switch>
  </Layout>
);
