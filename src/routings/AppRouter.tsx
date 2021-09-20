import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import { authSelector } from '../store/selectors';
import { HomeView } from '../views';
import { ProtectedRoute } from './ProtectedRoute';
import { routes, routesDictionary } from './routesDictionary';

export const AppRouter = () => {

  const isAuthenticated = useSelector(authSelector.isAuthenticated);

  return (
    <Route>
      <Switch>
        {
          routesDictionary.map((route) =>[
            routes.Login, routes.Signup
          ].includes(route.path) ? 
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
        <ProtectedRoute 
          isAuthenticated={isAuthenticated} 
          path="*" 
          component={HomeView} 
        />
      </Switch>
    </Route>
  )
};
