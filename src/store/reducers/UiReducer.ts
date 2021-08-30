import { createReducer } from '@reduxjs/toolkit';
import { IObject } from '../../utils/interfaces';
import { uiAction } from '../actions';


export interface IUIState extends IObject {
  startingApp: boolean;
  viewLoading: boolean;
  viewLoadingText: string;
  success: boolean | null;
  fail: boolean | null;
}

const initial: IUIState = {
  startingApp: false,
  viewLoading: false,
  viewLoadingText: 'loading...',
  success: null,
  fail: null
};

export const uiReducer = createReducer(initial, build => {
  build
    .addCase(uiAction.loadingUi, 
      (state , action) => {
        state[action.payload.type] = action.payload.loading;
        return state;
    })
    .addCase(uiAction.viewLoading,
      (state, action) => {
        state.viewLoading = action.payload.loading;    
        state.viewLoadingText = action.payload.text || 'loading...';
        return state;
    })
    .addCase(uiAction.setLoadingResult,
      (state, action) => {
        state[action.payload.type] = action.payload.loading;
        return state;
    })
});