import { FC } from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';

interface Props {
  component: FC<RouteComponentProps>;
  policyName?: string;
  path: string; 
  exact?: boolean;
  isAuthenticated: boolean;
}

export const ProtectedRoute: FC<Props> = ({
  component: Component,
  policyName = '',
  isAuthenticated,
  path,
  exact = false, 
  ...rest
}) => {

  return (
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