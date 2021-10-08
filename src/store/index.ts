import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore, PersistConfig } from 'redux-persist';
import { routerMiddleware } from 'connected-react-router';
import storage  from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import reducers, { IState } from './reducers';
import { rootSaga } from './saga';
import history from '../routings/history';


const persistConfig: PersistConfig<IState> = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  blacklist: [
    'router', 
    'ui', 
    'audio', 
    'playlist', 
    'taskState',
    'queue',
    'search'
  ],
};
const persistedReducer = persistReducer(persistConfig, reducers);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [
    routerMiddleware(history),
    sagaMiddleware,
  ]
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

sagaMiddleware.run(rootSaga);