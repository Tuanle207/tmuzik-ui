import React from 'react';
import { Route, Router, Switch } from 'react-router';
import { HomeView } from '../views';
import { history } from './history';

export const AppRouter = () => {

  return (
    <Router history={history}>
      <Switch>
        <Route path='/' exact component={HomeView} />
      </Switch>
    </Router>
  )
};
