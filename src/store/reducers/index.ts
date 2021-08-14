import { combineReducers } from 'redux';
import { authReducer, IAuthState } from './authReducer';
import { IUiState, uiReducer } from './uiReducer';

export interface IState {
  ui: IUiState;
  auth: IAuthState;
}

const reducers = combineReducers<IState>({
  ui: uiReducer,
  auth: authReducer,
});

export default reducers;