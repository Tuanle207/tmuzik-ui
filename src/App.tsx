import React, { FC, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { MainView } from './components';
import { persistor, store } from './store';
import { authAction } from './store/actions';
import { uiSelector } from './store/selectors';

const Container: FC = () => {

  const dispatch = useDispatch();
  const startingApp = useSelector(uiSelector.startingApp);

  useEffect(() => {
    dispatch(authAction.checkLogin());
  }, [ dispatch ]);

  return (
    <>
      {
        startingApp ? 
        <div style={{ color: 'red' }}>loading...</div> :
        <MainView />
      }
      <ToastContainer
        autoClose={3000}
        hideProgressBar={true}
        pauseOnHover
        position="top-right"
      />
    </>
  );
};

const App: FC = () => {


  React.useEffect(() => {
    // const preventRightClick = (e: any) => e.preventDefault();
    // window.addEventListener('contextmenu', preventRightClick, false);

    // return () => {
    //   window.removeEventListener('contextmenu', preventRightClick);
    // }
    // fbHandler.initialize();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Container />
      </PersistGate> 
    </Provider>
  );
}

export default App;
