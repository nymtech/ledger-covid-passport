import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Onboarding } from './Onboarding';
import { UploadId } from './UploadId';
import { UploadPleaseWait } from './UploadPleaseWait';

export const OnboardingUrlPaths = {
  onboarding: '/user/onboarding',
  onboardingUpload: '/user/onboarding/upload',
  onboardingUploadWait: '/user/onboarding/wait',
};

export const OnboardingRoutes: React.FC = () => (
  <Switch>
    <Route exact path={OnboardingUrlPaths.onboardingUpload}>
      <UploadId />
    </Route>
    <Route exact path={OnboardingUrlPaths.onboarding}>
      <Onboarding />
    </Route>
    <Route exact path={OnboardingUrlPaths.onboardingUploadWait}>
      <UploadPleaseWait />
    </Route>
  </Switch>
);
