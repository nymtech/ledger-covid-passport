import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as React from 'react';
import { FC } from 'react';
import { ValidateRoutes, ValidateUrlPaths } from './routes/Verifier/Validate';
import {
  CertificateRoutes,
  CertificateUrlPaths,
} from './routes/UK/Patient/Certificate';
import {
  OnboardingRoutes,
  OnboardingUrlPaths,
} from './routes/UK/Patient/Onboarding';
import { UserRoutes, UserUrlPaths } from './routes/User';
import { VerifierRoutes, VerifierUrlPaths } from './routes/Verifier';
import { PatientRoutes, PatientUrlPaths } from './routes/UK/Patient';
import { HomePage } from './routes/index';
import { ValidatorViewRoutes, ViewUrlPaths } from './routes/Verifier/View';
import { DebugRoutes, DebugUrlPaths } from './routes/Debug';

export const routes = {
  home: '/',
  user: {
    ...UserUrlPaths,
  },
  uk: {
    patient: {
      ...PatientUrlPaths,
      ...OnboardingUrlPaths,
      ...CertificateUrlPaths,
    },
  },
  verifier: {
    ...VerifierUrlPaths,
    ...ValidateUrlPaths,
    ...ViewUrlPaths,
  },
  debug: {
    ...DebugUrlPaths,
  },
};

export const Routes: FC = () => (
  <Router>
    <Switch>
      <Route path={routes.user.home}>
        <UserRoutes />
      </Route>
      <Route path={routes.uk.patient.certificate}>
        <CertificateRoutes />
      </Route>
      <Route path={routes.verifier.validate}>
        <ValidateRoutes />
      </Route>
      <Route path={routes.verifier.view}>
        <ValidatorViewRoutes />
      </Route>
      <Route path={routes.uk.patient.onboarding}>
        <OnboardingRoutes />
      </Route>
      <Route path={routes.uk.patient.home}>
        <PatientRoutes />
      </Route>
      <Route path={routes.verifier.home}>
        <VerifierRoutes />
      </Route>
      <Route path={routes.debug.home}>
        <DebugRoutes />
      </Route>
      <Route exact path="/">
        <HomePage />
      </Route>
    </Switch>
  </Router>
);
