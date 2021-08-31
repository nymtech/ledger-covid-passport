import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as React from 'react';
import { FC } from 'react';
import { ValidateRoutes, ValidateUrlPaths } from './routes/Verifier/Validate';
import {
  CertificateRoutes,
  CertificateUrlPaths,
} from './routes/Patient/Certificate';
import {
  OnboardingRoutes,
  OnboardingUrlPaths,
} from './routes/Patient/Onboarding';
import { VerifierRoutes, VerifierUrlPaths } from './routes/Verifier';
import { PatientRoutes, PatientUrlPaths } from './routes/Patient';
import { HomePage } from './routes/index';
import { ValidatorViewRoutes, ViewUrlPaths } from './routes/Verifier/View';
import { DebugRoutes, DebugUrlPaths } from './routes/Debug';

export const routes = {
  home: '/',
  patient: {
    ...PatientUrlPaths,
    ...OnboardingUrlPaths,
    ...CertificateUrlPaths,
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
      <Route path={routes.patient.certificate}>
        <CertificateRoutes />
      </Route>
      <Route path={routes.verifier.validate}>
        <ValidateRoutes />
      </Route>
      <Route path={routes.verifier.view}>
        <ValidatorViewRoutes />
      </Route>
      <Route path={routes.patient.onboarding}>
        <OnboardingRoutes />
      </Route>
      <Route path={routes.patient.home}>
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
