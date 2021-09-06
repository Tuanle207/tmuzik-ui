import { combineReducers } from 'redux';
import { audioReducer, IAudioState } from './audioReducer';
import { authReducer, IAuthState } from './authReducer';
import { uiReducer, IUIState } from './uiReducer';
import { queueReducer, IQueueState } from './queueReducer';
import { connectRouter, RouterState } from 'connected-react-router';
import { history } from '../../routings';
import { IPlaylist, playlistReducer } from './playlistReducer';
import { taskStateReducer, ITaskState  } from './taskStateReducer';

export interface IState {
  router: RouterState;
  ui: IUIState;
  auth: IAuthState;
  audio: IAudioState;
  queue: IQueueState;
  playlist: IPlaylist;
  taskState: ITaskState;
}

const reducers = combineReducers<IState>({
  router: connectRouter(history),
  ui: uiReducer,
  auth: authReducer,
  audio: audioReducer,
  queue: queueReducer,
  playlist: playlistReducer,
  taskState: taskStateReducer,
});

export default reducers;