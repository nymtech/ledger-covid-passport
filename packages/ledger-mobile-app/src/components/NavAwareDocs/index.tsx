import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { routes } from '../../Routes';

import RoutesHome from '../../content/home.mdx';
import RoutesUserHome from '../../content/user/home.mdx';
import RoutesUserOnboardingHome from '../../content/user/onboarding/home.mdx';
import RoutesUserOnboardingOnboardingUpload from '../../content/user/onboarding/step1-upload.mdx';
import RoutesUserOnboardingOnboardingUploadWait from '../../content/user/onboarding/step2-verify.mdx';
import RoutesUserAppAddCovidPass from '../../content/user/wallet/add/covid-pass.mdx';
import RoutesUserAppViewNymPassport from '../../content/user/nym-id.mdx';
import RoutesUserAppViewCovidPassHome from '../../content/user/wallet/view/covid-pass/home.mdx';
import RoutesUserAppViewCovidPassShowPCC from '../../content/user/wallet/view/covid-pass/show-pcc.mdx';
import RoutesUserAppViewCovidPassNewCustom from '../../content/user/wallet/view/covid-pass/new-custom.mdx';
import RoutesUserAppViewCovidPassScanVerifierCode from '../../content/user/wallet/view/covid-pass/scan-verifier-code.mdx';
import RoutesUserAppViewCovidPassConfirmVerifierCode from '../../content/user/wallet/view/covid-pass/confirm-verifier-code.mdx';

export const NavAwareDocs: React.FC = () => {
  const components = {};
  return (
    <Switch>
      <Route exact path={routes.home}>
        <RoutesHome components={components} />
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
      <Route exact path={routes.user.app.add.covidPass}>
        <RoutesUserAppAddCovidPass components={components} />
      </Route>
      <Route exact path={routes.user.app.view.nymPassport}>
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
