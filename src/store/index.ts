import { AnyAction, configureStore, EmptyObject, EnhancedStore } from '@reduxjs/toolkit';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import storage  from 'redux-persist/es/storage';
import reducers, { IState } from './reducers';
import persistReducer, { PersistPartial } from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import { rootSaga } from './saga';

const persistConfig = {
  key: 'root',
  storage: storage ,
  whilelist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, reducers);
const sagaMiddleware = createSagaMiddleware();


export const store = configureStore({
  reducer: persistedReducer,
  middleware: [
    sagaMiddleware,
  ]
});

export type IStore = EnhancedStore<EmptyObject & IState & PersistPartial, AnyAction, SagaMiddleware<object>[]>;

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

sagaMiddleware.run(rootSaga);