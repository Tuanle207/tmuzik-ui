import { all, call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { dashboardApiService } from '../../api/services';
import { taskStateAction } from '../actions';
import { searchAction } from '../actions/searchAction';
import { store } from '..';


function* getSearchResults(action: PayloadAction<API.GetSearchResultsRequest>): SagaIterator {
  try {
    yield put(taskStateAction.getSearchResults({state: 'processing'}));
    
    const { payload } = action;
    const result: API.GetSearchResultsResponse = yield call(dashboardApiService.getSearchResultsAsync, payload);
    
    const { search: { query } } = store.getState();
    if (payload.query !== query) {
      console.log('diff')
      const data: API.GetSearchResultsResponse = {
        users: result.users || { items: [] }
      };
      yield put(searchAction.setSearchResultsStorage(data));
    }
    
    else {
      console.log('same');
    }

    yield put(searchAction.setQueryStorage(payload.query));
    yield put(taskStateAction.getSearchResults({state: 'success'}));
  } catch (err: any) {
    console.log(err);
    yield put(taskStateAction.getSearchResults({state: 'error', error: err?.message}));
  }
}

export default function* searchSaga() {
  yield all([
    takeLatest(searchAction.getSearchResults, getSearchResults),
  ]);
};