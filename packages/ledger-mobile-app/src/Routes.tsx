import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as React from 'react';
import { FC } from 'react';
import { ValidateRoutes, ValidateUrlPaths } from './routes/Verifier/Validate';
import { UserRoutes, UserUrlPaths } from './routes/User';
import { VerifierRoutes, VerifierUrlPaths } from './routes/Verifier';
import { HomePage } from './routes/index';
import { ValidatorViewRoutes, ViewUrlPaths } from './routes/Verifier/View';

export const routes = {
  home: '/',
  user: {
    ...UserUrlPaths,
  },
  verifier: {
    ...VerifierUrlPaths,
    ...ValidateUrlPaths,
    ...ViewUrlPaths,
  },
};

export const Routes: FC = () => (
  <Router>
    <Switch>
      <Route path={routes.user.home}>
        <UserRoutes />
      </Route>
      <Route path={routes.verifier.validate}>
        <ValidateRoutes />
      </Route>
      <Route path={routes.verifier.view}>
        <ValidatorViewRoutes />
      </Route>
      <Route path={routes.verifier.home}>
        <VerifierRoutes />
      </Route>
      <Route exact path="/">
        <HomePage />
      </Route>
    </Switch>
  </Router>
);
