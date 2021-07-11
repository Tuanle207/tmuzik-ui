import { combineReducers } from 'redux';
import { IUiState, UiReducer } from './UiReducer';

export interface IState {
  ui: IUiState;
}

const reducers = combineReducers<IState>({
  ui: UiReducer
})

export default reducers;