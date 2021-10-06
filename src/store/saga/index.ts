import { all, fork } from 'redux-saga/effects';
import authSaga from './auth';
import audioSaga from './audio';
import playlistSaga from './playlist';
import uiSaga from './ui';
import dashboardSaga from './dashboard';

export function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(audioSaga),
    fork(playlistSaga),
    fork(uiSaga),
    fork(dashboardSaga),
  ]);
}