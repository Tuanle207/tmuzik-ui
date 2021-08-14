import { createReducer } from '@reduxjs/toolkit';
import { Util } from '../../utils/interfaces';
import { uiAction } from '../actions';


export interface IUiState {
  startingApp: boolean;
}

const initial: IUiState = {
  startingApp: false,
};

export const uiReducer = createReducer(initial, build => {
  build
    .addCase(
      uiAction.loadingUi, 
      (state: Util.IObject, action: Util.IAction) => {
        state[action.payload.type] = action.payload.loading;
    });
});