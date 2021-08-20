import { useSelector } from 'react-redux';
import { Redirect, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { authSelectors } from '../store/selectors';
import { LoginView } from '../views';
import { ProtectedRoute } from './ProtectedRoute';
import { paths, routesDictionary } from './routesDictionary';

export const AppRouter = () => {

  const isAuthenticated = useSelector(authSelectors.isAuthenticated);

  return (
    <Router>
      <Switch>
        {
          !isAuthenticated ? (
            <>
              <Route
                path={paths.Login} 
                exact 
                component={LoginView}
              />
              <Redirect to={paths.Login} />
            </>
          ) :
          <>
            {
              routesDictionary.map((route) => route.path === paths.Login ? 
                null : (
                <ProtectedRoute 
                  key={route.path} 
                  path={route.path} 
                  exact 
                  component={route.view}
                  isAuthenticated={isAuthenticated} 
                />
              ))
            }
            <Redirect to={paths.Home} />
          </>
        }
      </Switch>
    </Router>
  )
};
