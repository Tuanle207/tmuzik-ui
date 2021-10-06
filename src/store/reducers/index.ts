import { combineReducers } from 'redux';
import { audioReducer, IAudioState } from './audioReducer';
import { authReducer, IAuthState } from './authReducer';
import { uiReducer, IUIState } from './uiReducer';
import { queueReducer, IQueueState } from './queueReducer';
import { connectRouter, RouterState } from 'connected-react-router';
import history from '../../routings/history';
import { IPlaylist, playlistReducer } from './playlistReducer';
import { taskStateReducer, ITaskState  } from './taskStateReducer';
import { dashboardReducer, IDashboardState  } from './dashboardReducer';

export interface IState {
  router: RouterState;
  ui: IUIState;
  auth: IAuthState;
  audio: IAudioState;
  // queue: IQueueState & PersistPartial;
  queue: IQueueState;
  playlist: IPlaylist;
  dashboard: IDashboardState;
  taskState: ITaskState;
}


// const queuePersistConfig: PersistConfig<IQueueState> = {
//   key: 'queue',
//   storage,
//   blacklist: ['playingStatus']
// };

// const persistedQueue = persistReducer(queuePersistConfig, queueReducer);

const routerReducer = connectRouter(history);

const reducers = combineReducers<IState>({
  router: routerReducer,
  ui: uiReducer,
  auth: authReducer,
  audio: audioReducer,
  // queue: persistedQueue,
  queue: queueReducer,
  playlist: playlistReducer,
  dashboard: dashboardReducer,
  taskState: taskStateReducer,
});

export default reducers;