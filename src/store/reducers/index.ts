import { combineReducers } from 'redux';
import { authReducer, IAuthState } from './authReducer';
import { IUIState, uiReducer } from './uiReducer';

export interface IState {
  ui: IUIState;
  auth: IAuthState;
}

const reducers = combineReducers<IState>({
  ui: uiReducer,
  auth: authReducer,
});

export default reducers;