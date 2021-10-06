import { all, call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { dashboardApiService } from '../../api/services';
import { taskStateAction } from '../actions';
import { dashboardAction } from '../actions/dashboardAction';


function* getSearchResults(action: PayloadAction<API.GetSearchResultsRequest>): SagaIterator {
  try {
    yield put(taskStateAction.getSearchResults({state: 'processing'}));
    const { payload } = action;
    console.log('calling');
    const result = yield call(dashboardApiService.getSearchResultsAsync, payload);
    console.log('called');
    yield put(dashboardAction.setSearchResultsStorage(result));
    yield put(taskStateAction.getSearchResults({state: 'success'}));
  } catch (err: any) {
    console.log(err);
    yield put(taskStateAction.getSearchResults({state: 'error', error: err?.message}));
  }
}

export default function* dashboardSaga() {
  yield all([
    takeLatest(dashboardAction.getSearchResults, getSearchResults),
  ]);
};