import { createReducer } from '@reduxjs/toolkit';
import { Util } from '../../utils/interfaces';
import { UiAction } from '../actions';


export interface IUiState {
  startingApp: boolean;
}

const initial: IUiState = {
  startingApp: false,
};

export const UiReducer = createReducer(initial, build => {
  build
    .addCase(
      UiAction.loadingUi, 
      (state: Util.IObject, action: Util.IAction) => {
        state[action.payload.type] = action.payload.loading;
    });
});