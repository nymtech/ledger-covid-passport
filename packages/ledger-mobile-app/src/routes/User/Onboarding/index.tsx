import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Onboarding } from './Onboarding';
import { AuthStart } from './AuthStart';
import { AuthWait } from './AuthWait';
import { AuthDone } from './AuthDone';

export const OnboardingUrlPaths = {
  home: '/user/onboarding',
  onboardingAuthStart: '/user/onboarding/auth/start',
  onboardingAuthPleaseWait: '/user/onboarding/auth/wait',
  onboardingAuthDone: '/user/onboarding/auth/done',
};

export const OnboardingRoutes: React.FC = () => (
  <Switch>
    <Route exact path={OnboardingUrlPaths.onboardingAuthStart}>
      <AuthStart />
    </Route>
    <Route exact path={OnboardingUrlPaths.onboardingAuthPleaseWait}>
      <AuthWait />
    </Route>
    <Route exact path={OnboardingUrlPaths.onboardingAuthDone}>
      <AuthDone />
    </Route>
    <Route exact path={OnboardingUrlPaths.home}>
      <Onboarding />
    </Route>
  </Switch>
);
