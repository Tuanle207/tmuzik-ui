import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { audioApiService } from '../../api/services';
import { uiAction } from '../actions';
import { audioAction } from '../actions/audioAction';

function* postUploadAudio(action: PayloadAction<API.UploadAudioRequest>): SagaIterator {
  try {
    const { payload } = action;
    yield put(uiAction.viewLoading({
      loading: true,
      text: 'đang tải lên...'
    }));

    yield call(audioApiService.uploadAudioAsync, payload);

    yield put(uiAction.setLoadingResult({
      type: 'success',
      loading: true
    }));

  } catch (err) {

  }
  finally {
    yield put(uiAction.viewLoading({
      loading: false
    }))
  }
}

function* getUserUploadAudio(action: PayloadAction<API.GetUserUploadAudioRequest>): SagaIterator {
  try {
    const { payload } = action;
    yield put(audioAction.setUserUploadAudioStatus({
      loading: true
    }));

    const result = yield call(audioApiService.getUserUploadAudioAsync, payload);

    yield put(audioAction.setUserUploadAudioStorage(result));

    yield put(audioAction.setUserUploadAudioStatus({
      loading: false
    }));

  } catch (err) {
    console.log(err);
    yield put(audioAction.setUserUploadAudioStatus({
      loading: false,
      error: err.response?.message ?? err.message ?? 'Unable to fetch data'
    }));
  }
}

export default function* audioSaga() {
  yield all([
    takeLatest(audioAction.postUploadAudio, postUploadAudio),
    takeLatest(audioAction.getUserUploadAudio, getUserUploadAudio),
  ]);
}