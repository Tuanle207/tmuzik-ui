import { AnyAction, configureStore, EmptyObject, EnhancedStore } from '@reduxjs/toolkit';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import reducers, { IState } from './reducers';
import { persistReducer, persistStore, PersistConfig } from 'redux-persist';
import storage  from 'redux-persist/lib/storage';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { rootSaga } from './saga';
import history from '../routings/history';
import { routerMiddleware } from 'connected-react-router';


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
    // 'queue'
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

export type IStore = EnhancedStore<EmptyObject & IState & PersistPartial, AnyAction, SagaMiddleware<object>[]>;

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

sagaMiddleware.run(rootSaga);