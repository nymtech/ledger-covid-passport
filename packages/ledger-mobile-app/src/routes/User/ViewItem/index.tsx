import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  ViewCovidPassRoutes,
  ViewCovidPassUrlPaths as covidPass,
} from './CovidPass';
import { ViewNymPassport } from './NymPassport';

export const ViewItemUrlPaths = {
  home: '/user/app/view',
  covidPass,
  nymPassport: '/user/app/view/nym-passport',
};

export const ViewItemRoutes: React.FC = () => (
  <Switch>
    <Route path={ViewItemUrlPaths.covidPass.home}>
      <ViewCovidPassRoutes />
    </Route>
    <Route exact path={ViewItemUrlPaths.nymPassport}>
      <ViewNymPassport />
    </Route>
  </Switch>
);
