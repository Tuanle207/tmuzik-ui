import { combineReducers } from 'redux';
import { audioReducer, IAudioState } from './audioReducer';
import { authReducer, IAuthState } from './authReducer';
import { uiReducer, IUIState } from './uiReducer';
import { queueReducer, IQueueState } from './queue';

export interface IState {
  ui: IUIState;
  auth: IAuthState;
  audio: IAudioState;
  queue: IQueueState
}

const reducers = combineReducers<IState>({
  ui: uiReducer,
  auth: authReducer,
  audio: audioReducer,
  queue: queueReducer,
});

export default reducers;