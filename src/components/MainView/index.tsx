import { FC } from 'react';
import { Sidebar } from '../Sidebar';
import { NowPlayingBar } from '../NowPlayingBar';
import styles from './index.module.scss';
import { SpinLoader } from '../Loader';
import { useSelector } from 'react-redux';
import { authSelectors, uiSelector } from '../../store/selectors';
import { AppRouter, paths } from '../../routings';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LoginView } from '../../views';

interface IMainViewProps { }

export const MainView: FC<IMainViewProps> = () => {

  const viewLoading = useSelector(uiSelector.viewLoading);
  const viewLoadingText = useSelector(uiSelector.viewLoadingText);
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);

  return (
    <Router>
      <Route>
        {
          !isAuthenticated ? (
            <Switch>
              <Route
                path={paths.Login} 
                exact 
                component={LoginView}
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
    </Router>
  );
};


