import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppHome } from './Home';
import { AppLayout } from './Layout';
import { ViewItemRoutes, ViewItemUrlPaths } from '../ViewItem';

export const AppUrlPaths = {
  home: '/user/app',
};

export const AppRoutes: React.FC = () => (
  <AppLayout>
    <Switch>
      <Route exact path={AppUrlPaths.home}>
        <AppHome />
      </Route>
      <Route path={ViewItemUrlPaths.home}>
        <ViewItemRoutes />
      </Route>
    </Switch>
  </AppLayout>
);
