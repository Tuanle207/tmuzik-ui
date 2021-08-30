import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { authSelectors } from '../store/selectors';
import { HomeView } from '../views';
import { ProtectedRoute } from './ProtectedRoute';
import { paths, routesDictionary } from './routesDictionary';

export const AppRouter = () => {

  const isAuthenticated = useSelector(authSelectors.isAuthenticated);

  return (
    <Route>
      <Switch>
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
        <ProtectedRoute 
          isAuthenticated={isAuthenticated} 
          path="*" 
          component={HomeView} 
        />
      </Switch>
    </Route>
  )
};
