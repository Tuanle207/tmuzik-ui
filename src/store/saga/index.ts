import { all, fork } from 'redux-saga/effects';
import authSaga from './auth';
import audioSaga from './audio';
import playlistSaga from './playlist';

export function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(audioSaga),
    fork(playlistSaga),
  ]);
}