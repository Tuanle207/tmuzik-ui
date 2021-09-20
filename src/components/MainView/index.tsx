import { FC, ReactNode, useEffect } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Sidebar } from '../Sidebar';
import { NowPlayingBar } from '../NowPlayingBar';
import { SpinLoader } from '../Loader';
import { useSelector } from 'react-redux';
import { authSelector, uiSelector } from '../../store/selectors';
import { AppRouter, routes } from '../../routings';
import history from '../../routings/history';
import { LoginView, SignupView } from '../../views';
import { Route, Switch } from 'react-router';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { IState } from '../../store/reducers';
import styles from './index.module.scss';
import './slide-animation.scss';

interface IMainViewProps { }


export const MainView: FC<IMainViewProps> = () => {

  const viewLoading = useSelector(uiSelector.viewLoading);
  const viewLoadingText = useSelector(uiSelector.viewLoadingText);
  const isAuthenticated = useSelector(authSelector.isAuthenticated);
  const location = useSelector((state: IState) => state.router.location);

  useEffect(() => {
    // window.loadPromise = new Promise(resolve => {
    //   window.addEventListener('DOMContentLoaded' as any, resolve);
    // });
  }, []);

  return (
    <ConnectedRouter history={history}>
      <Switch location={location}>
        <Route>
          {
            !isAuthenticated ? (
              <Switch>
                <Route
                  path={routes.Login} 
                  exact 
                  component={LoginView}
                />
                <Route
                  path={routes.Signup} 
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
      </Switch>
    </ConnectedRouter>
  );
};


