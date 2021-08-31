import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Onboarding } from './Onboarding';
import { UploadId } from './UploadId';
import { PatientLayout as Layout } from '../../../layouts/DefaultLayout';
import { UploadVerify } from './UploadVerify';
import { UploadPleaseWait } from './UploadPleaseWait';

export const OnboardingUrlPaths = {
  onboarding: '/patient/onboarding',
  onboardingUpload: '/patient/onboarding/upload',
  onboardingUploadVerify: '/patient/onboarding/verify',
  onboardingUploadWait: '/patient/onboarding/wait',
};

export const OnboardingRoutes: React.FC = () => (
  <Layout>
    <Switch>
      <Route exact path={OnboardingUrlPaths.onboardingUpload}>
        <UploadId />
      </Route>
      <Route exact path={OnboardingUrlPaths.onboarding}>
        <Onboarding />
      </Route>
      <Route exact path={OnboardingUrlPaths.onboardingUploadVerify}>
        <UploadVerify />
      </Route>
      <Route exact path={OnboardingUrlPaths.onboardingUploadWait}>
        <UploadPleaseWait />
      </Route>
    </Switch>
  </Layout>
);
