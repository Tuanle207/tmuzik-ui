import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import storage  from 'redux-persist/lib/storage';
import reducers from './reducers';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import { rootSaga } from './saga';

const persistConfig = {
  key: 'root',
  storage: storage ,
  whilelist: ['ui']
};

const persistedReducer = persistReducer(persistConfig, reducers);
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [
    sagaMiddleware,
  ]
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);