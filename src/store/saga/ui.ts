import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { all, put, call, takeLeading } from 'redux-saga/effects';
import { sleepAsync } from '../../utils/sleepAsync';
import { uiAction } from '../actions';

function* setListenPartyDisplay(action: PayloadAction<boolean>): SagaIterator {
  yield call(sleepAsync, 0);
  const { payload } = action;
  yield put(uiAction.setListenPartyBoxDisplayStorage(payload));
}

export default function* uiSaga() {
  yield all([
    takeLeading(uiAction.setListenPartyBoxDisplay, setListenPartyDisplay),
  ]);
}