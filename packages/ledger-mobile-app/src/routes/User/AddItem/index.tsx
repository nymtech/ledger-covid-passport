import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AddCovidPass } from './CovidPass';

export const AddItemUrlPaths = {
  home: '/user/app/add',
  covidPass: '/user/app/add/covid-pass',
};

export const AddItemRoutes: React.FC = () => (
  <Switch>
    <Route exact path={AddItemUrlPaths.covidPass}>
      <AddCovidPass />
    </Route>
  </Switch>
);
