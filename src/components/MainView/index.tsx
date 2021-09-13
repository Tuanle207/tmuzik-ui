import { FC } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Sidebar } from '../Sidebar';
import { NowPlayingBar } from '../NowPlayingBar';
import { SpinLoader } from '../Loader';
import { useSelector } from 'react-redux';
import { authSelector, uiSelector } from '../../store/selectors';
import { AppRouter, paths } from '../../routings';
import history from '../../routings/history';
import { LoginView, SignupView } from '../../views';
import styles from './index.module.scss';
import { Route, Switch } from 'react-router';

interface IMainViewProps { }

export const MainView: FC<IMainViewProps> = () => {

  const viewLoading = useSelector(uiSelector.viewLoading);
  const viewLoadingText = useSelector(uiSelector.viewLoadingText);
  const isAuthenticated = useSelector(authSelector.isAuthenticated);

  return (
    <ConnectedRouter history={history}>
      <Route>
        {
          !isAuthenticated ? (
            <Switch>
              <Route
                path={paths.Login} 
                exact 
                component={LoginView}
              />
              <Route
                path={paths.Signup} 
                exact 
                component={SignupView}
              />
              <Route component={LoginView} />
            </Switch>
          ) : (
            <div className={styles.container}>
              <div className={styles.content}>
                <Sidebar />
                {
                  viewLoading && (
                    <div className={styles.loaderWrapper}>
                      <SpinLoader text={viewLoadingText}/>
                    </div>    
                  )
                }
                <AppRouter />
              </div>
              <NowPlayingBar />
            </div>
          )
        }
      </Route>
    </ConnectedRouter>
  );
};


