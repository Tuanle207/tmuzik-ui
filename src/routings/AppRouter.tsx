import React from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { paths, routesDictionary } from './routesDictionary';

export const AppRouter = () => {

  return (
    <Router>
      <Switch>
        {
          routesDictionary.map((route) => (
            <Route key={route.path} path={route.path} exact component={route.view} />
          ))
        }
        <Redirect to={paths.Home} />
      </Switch>
    </Router>
  )
};
