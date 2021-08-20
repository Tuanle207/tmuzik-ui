import { createReducer } from '@reduxjs/toolkit';
import { IObject } from '../../utils/interfaces';
import { uiAction } from '../actions';


export interface IUIState extends IObject<boolean> {
  startingApp: boolean;
}

const initial: IUIState = {
  startingApp: false,
};

export const uiReducer = createReducer(initial, build => {
  build
    .addCase(uiAction.loadingUi, 
      (state , action) => {
        state[action.payload.type] = action.payload.loading;
        return state;
    });
});