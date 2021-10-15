import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { routes } from '../../Routes';

// import this way so that webpack handles the chunking
const {
  RoutesHome,
  RoutesUserHome,
  RoutesUserSplash,
  RoutesUserOnboardingHome,
  RoutesUserOnboardingOnboardingUpload,
  RoutesUserOnboardingOnboardingUploadWait,
  RoutesUserAppAddCovidPass,
  RoutesUserAppViewNymPassport,
  RoutesUserAppViewCovidPassHome,
  RoutesUserAppViewCovidPassShowPCC,
  RoutesUserAppViewCovidPassNewCustom,
  RoutesUserAppViewCovidPassScanVerifierCode,
  RoutesUserAppViewCovidPassConfirmVerifierCode,
} = require('../../content/index');

export const NavAwareDocs: React.FC = () => {
  const components = {};
  return (
    <Switch>
      <Route exact path={routes.home}>
        <RoutesHome components={components} />
      </Route>
      <Route exact path={routes.user.home}>
        <RoutesUserSplash components={components} />
      </Route>
      <Route exact path={routes.user.app.home}>
        <RoutesUserHome components={components} />
      </Route>
      <Route exact path={routes.user.onboarding.home}>
        <RoutesUserOnboardingHome components={components} />
      </Route>
      <Route exact path={routes.user.onboarding.onboardingUpload}>
        <RoutesUserOnboardingOnboardingUpload components={components} />
      </Route>
      <Route exact path={routes.user.onboarding.onboardingUploadWait}>
        <RoutesUserOnboardingOnboardingUploadWait components={components} />
      </Route>
      <Route exact path={routes.user.app.view.nymId}>
        <RoutesUserAppViewNymPassport components={components} />
      </Route>
      <Route exact path={routes.user.app.view.covidPass.home}>
        <RoutesUserAppViewCovidPassHome components={components} />
      </Route>
      <Route exact path={routes.user.app.view.covidPass.newCustom}>
        <RoutesUserAppViewCovidPassNewCustom components={components} />
      </Route>
      <Route exact path={routes.user.app.view.covidPass.showPCC}>
        <RoutesUserAppViewCovidPassShowPCC components={components} />
      </Route>
      <Route exact path={routes.user.app.view.covidPass.scanVerifierCode}>
        <RoutesUserAppViewCovidPassScanVerifierCode components={components} />
      </Route>
      <Route exact path={routes.user.app.view.covidPass.confirmVerifierCode}>
        <RoutesUserAppViewCovidPassConfirmVerifierCode
          components={components}
        />
      </Route>
    </Switch>
  );
};
