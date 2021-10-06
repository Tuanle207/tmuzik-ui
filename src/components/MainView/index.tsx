import { FC, useEffect, useState } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Sidebar } from '../Sidebar';
import { NowPlayingBar } from '../NowPlayingBar';
import { SpinLoader } from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, uiSelector } from '../../store/selectors';
import { AppRouter, routes } from '../../routings';
import history from '../../routings/history';
import { LoginView, SignupView } from '../../views';
import { Route, Switch, useHistory } from 'react-router';
import { IState } from '../../store/reducers';
import { uiAction } from '../../store/actions';
import { ListenParty } from '..';
import { ListenPartyMenu } from '../ListenParty/components';
import styles from './index.module.scss';
import './slide-animation.scss';

interface IMainViewProps { }

const Router = () => {

  // const history = useHistory();
  
  // const [ index, setIndex ] = useState(0);
  // const [ locationKeys, setLocationKeys ] = useState<Array<(string | undefined)>>([]);

  const dispatch = useDispatch();
  const location = useSelector((state: IState) => state.router.location);
  const viewLoading = useSelector(uiSelector.viewLoading);
  const viewLoadingText = useSelector(uiSelector.viewLoadingText);
  const isAuthenticated = useSelector(authSelector.isAuthenticated);

  // TODO: Navigating buttons
  // useEffect(() => {
  //   history.listen((location, action) => {
  //     console.log('change');
  //     setIndex(index + 1);
  //     // console.log({index, locationKeys});
  //     // console.log('changing');
  //     // console.log(history);
  //     // if (action === 'PUSH') {
  //     //   console.log({
  //     //     end: index
  //     //   })
  //     //   const keys = locationKeys.slice(0, index);
  //     //   keys.push(location.key);
  //     //   let newIndex = index + 1;
  //     //   // const diff = locationKeys.length - keys.length - 1; 
  //     //   // console.log({diff});
  //     //   // if (diff > 0) {
  //     //   //   newIndex -= diff;
  //     //   // }
  //     //   console.log({keys, newIndex});
  //     //   setLocationKeys(keys);
  //     //   setIndex(newIndex);
  //     // }
  //     // if (action === 'POP') {
  //     //   if (locationKeys[index - 2] === location.key) {
  //     //     // Handle back event
  //     //     setIndex((prev) => prev - 1);
  //     //     console.log('backing');
  //     //   } else {
  //     //     // Handle back event
  //     //     console.log('forwarding..');
  //     //     setIndex((prev) => prev + 1);
  //     //   }
  //     // }
  //   });
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);


  // useEffect(() => {
  //   const { length } = history;
  //   const backButtonDisabled = index === 0;
  //   const forwardButtonDisabled = index === length - 2;
  //   dispatch(uiAction.setBackButtonDisabled(backButtonDisabled));
  //   dispatch(uiAction.setForwardButtonDisabled(forwardButtonDisabled));
    
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [ index ]);

  return (
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
                <ListenParty />
                <ListenPartyMenu />
              </div>
            )
          }
        </Route>
      </Switch>
  )
}

export const MainView: FC<IMainViewProps> = () => {

  return (
    <ConnectedRouter history={history}>
      <Router />
    </ConnectedRouter>
  );
};


