import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ViewCovidPassHome } from './Home';
import { CovidPassScanVerifier } from './ScanVerifierCode';
import { CovidPassCreateCustom } from './CreateCustom';
import { CovidPassShow } from './Show';
import { CovidPassShowPrivate } from './ShowPrivateCert';
import { CovidPassConfirmVerifierCode } from './ScanVerifierCodeConfirm';

export const ViewCovidPassUrlPaths = {
  home: '/user/app/view/covid-pass',
  reveal: '/user/app/view/covid-pass/reveal', // show raw clear text COVID certificate
  showPCC: '/user/app/view/covid-pass/show-pcc',
  newCustom: '/user/app/view/covid-pass/new-custom',
  scanVerifierCode: '/user/app/view/covid-pass/scan-verifier-code',
  confirmVerifierCode: '/user/app/view/covid-pass/confirm-verifier-code',
};

export const ViewCovidPassRoutes: React.FC = () => (
  <Switch>
    <Route exact path={ViewCovidPassUrlPaths.home}>
      <ViewCovidPassHome />
    </Route>
    <Route exact path={ViewCovidPassUrlPaths.reveal}>
      <CovidPassShow />
    </Route>
    <Route exact path={ViewCovidPassUrlPaths.showPCC}>
      <CovidPassShowPrivate />
    </Route>
    <Route exact path={ViewCovidPassUrlPaths.newCustom}>
      <CovidPassCreateCustom />
    </Route>
    <Route exact path={ViewCovidPassUrlPaths.scanVerifierCode}>
      <CovidPassScanVerifier />
    </Route>
    <Route exact path={ViewCovidPassUrlPaths.confirmVerifierCode}>
      <CovidPassConfirmVerifierCode />
    </Route>
  </Switch>
);
