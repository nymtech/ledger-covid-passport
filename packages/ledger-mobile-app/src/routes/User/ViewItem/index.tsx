import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  ViewCovidPassRoutes,
  ViewCovidPassUrlPaths as covidPass,
} from './CovidPass';
import { ViewNymId } from './NymId';

export const ViewItemUrlPaths = {
  home: '/user/app/view',
  covidPass,
  nymId: '/user/app/view/nym-id',
};

export const ViewItemRoutes: React.FC = () => (
  <Switch>
    <Route path={ViewItemUrlPaths.covidPass.home}>
      <ViewCovidPassRoutes />
    </Route>
    <Route exact path={ViewItemUrlPaths.nymId}>
      <ViewNymId />
    </Route>
  </Switch>
);
