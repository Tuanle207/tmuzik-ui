import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { SagaIterator } from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { playlistApiService } from '../../api/services';
import { paths } from '../../routings';
import { playlistAction, taskStateAction } from '../actions';

function* createPlaylist(action: PayloadAction<API.CreatePlaylistRequest>): SagaIterator {
  try {
    yield put(taskStateAction.createPlaylist({ state: 'processing' }));
    const { payload } = action;

    const result: API.CreatePlaylistResponse = yield call(playlistApiService.createPlaylistAsync, payload);

    yield put(playlistAction.setUserPlaylistsStorage([result]));

    const redirectPath = paths.Playlist.replace(':playlistId', result.id);
    yield put(push(redirectPath));
    yield put(taskStateAction.createPlaylist({ state: 'success' }));

  } catch (err: any) {
    console.log(err);
    const message = err?.message || err?.response?.message || undefined;
    yield put(taskStateAction.createPlaylist({ state: 'error', error: message }));
  }
}

function* updatePlaylist(action: PayloadAction<API.UpdatePlaylistRequest>): SagaIterator {
  try {
    yield put(taskStateAction.updatePlaylist({ state: 'processing' }));

    const { payload } = action;

    var result: API.UpdatePlaylistResponse = yield call(playlistApiService.updatePlaylistAsync, payload);

    yield put(playlistAction.setUserPlaylistsStorage([result]));

    yield put(taskStateAction.updatePlaylist({ state: 'success' }));
  } catch (err: any) {
    console.log(err);
    const message = err?.message || err?.response?.message || undefined;
    yield put(taskStateAction.updatePlaylist({ state: 'error', error: message }));
  }
}

function* removePlaylist(action: PayloadAction<string>): SagaIterator {
  try {
    const { payload } = action;

    yield call(playlistApiService.removePlaylistAsync, payload);

    yield put(playlistAction.removePlaylistStorage(payload));

  } catch (err) {
    console.log(err);
  }
}

function* getUserPlaylists(): SagaIterator {
  try {
    const result: API.GetUserPlaylistResponse = yield call(playlistApiService.getUserPlaylistsAsync);

    yield put(playlistAction.setUserPlaylistsStorage(result.items));

  } catch (err) {
    console.log(err);
  }
}

function* getUserPlaylistDetail(action: PayloadAction<string>): SagaIterator {
  try {
    yield put(taskStateAction.getPlaylistDetail({ state: 'processing' }));

    const { payload } = action;
    const result: API.PlaylistDetail = yield call(playlistApiService.getPlaylistDetailAsync, payload);

    yield put(playlistAction.setPlaylistDetailStorage(result));

    yield put(taskStateAction.getPlaylistDetail({ state: 'success' }));

  } catch (err: any) {
    console.log(err);
    const message = err?.message || err?.response?.message || undefined;
    yield put(taskStateAction.getPlaylistDetail({ state: 'error', error: message }));
  }
}

function* addPlaylistItem(action: PayloadAction<{ id: string; items: string[]; }>): SagaIterator {
  try {
    const { payload: { id, items } } = action;

    const result: API.AddPlaylistItemResponse = yield call(playlistApiService.addPlaylistItemAsync, id, { items });

    yield put(playlistAction.setPlaylistItemStorage({ id, items: result.items }));

  } catch (err) {
    console.log(err);
  }
}

function* removePlaylistItem(action: PayloadAction<{ id: string; items: string[]; }>): SagaIterator {
  try {
    const { payload: { id, items } } = action;

    yield call(playlistApiService.removePlaylistItemAsync, id, { items });

    yield put(playlistAction.removePlaylistItemStorage({ id, items }));

  } catch (err) {
    console.log(err);
  }
}


export default function* playlistSaga() {
  yield all([
    takeLatest(playlistAction.createPlaylist, createPlaylist),
    takeLatest(playlistAction.updatePlaylist, updatePlaylist),
    takeLatest(playlistAction.removePlaylist, removePlaylist),
    takeLatest(playlistAction.getUserPlaylists, getUserPlaylists),
    takeLatest(playlistAction.getPlaylistDetail, getUserPlaylistDetail),
    takeLatest(playlistAction.addPlaylistItem, addPlaylistItem),
    takeLatest(playlistAction.removePlaylistItem, removePlaylistItem),
  ]);
}