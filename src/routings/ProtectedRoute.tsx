import { FC } from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import { routes } from '.';

interface Props {
  component: FC<RouteComponentProps>;
  policyName?: string;
  path: string; 
  exact?: boolean;
  isAuthenticated: boolean;
  redirect?: boolean;
}

export const ProtectedRoute: FC<Props> = ({
  component: Component,
  policyName = '',
  isAuthenticated,
  path,
  exact = false,
  redirect = false,
  ...rest
}) => {

  return redirect ? (
    <Redirect to={{ pathname: routes.Home }} />
  ): (
    <Route
      {...{ path, exact, ...rest }}
      render={props => 
        isAuthenticated ? 
        (<Component {...props} />)
        :
        (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
      }
    />
  );
};