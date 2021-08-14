import React from 'react';
import { Provider } from 'react-redux';
import { fbHandler } from './configs/fb';
// import { connection, listen } from './configs/websocket';
import { AppRouter } from './routings';
import { store } from './store';

function App() {

  React.useEffect(() => {
    // const preventRightClick = (e: any) => e.preventDefault();
    // window.addEventListener('contextmenu', preventRightClick, false);

    // return () => {
    //   window.removeEventListener('contextmenu', preventRightClick);
    // }
    fbHandler.initialize();
  }, []);

  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
