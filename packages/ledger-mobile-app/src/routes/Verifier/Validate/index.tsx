import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ScanQRCode } from '../../../components/ScanQRCode';
import { VerifierLayout as Layout } from '../../../layouts/DefaultLayout';

export const ValidateUrlPaths = {
  validate: '/verifier/validate',
};

export const ValidateRoutes: React.FC = () => (
  <Layout>
    <Switch>
      <Route path={ValidateUrlPaths.validate}>
        <ScanQRCode />
      </Route>
    </Switch>
  </Layout>
);
