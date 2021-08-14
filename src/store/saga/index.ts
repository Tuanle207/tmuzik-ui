import { all, fork } from 'redux-saga/effects';
import authSaga from './auth';
import signalrSaga from './testSignalr';

export function* rootSaga() {
  yield all([
    fork(signalrSaga),
    fork(authSaga),
  ]);
}