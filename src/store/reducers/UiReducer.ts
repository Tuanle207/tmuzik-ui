import { createReducer } from '@reduxjs/toolkit';
import { IObject } from '../../utils/interfaces';
import { uiAction } from '../actions';


export interface IUIState extends IObject {
  startingApp: boolean;
  viewLoading: boolean;
  viewLoadingText: string;
  success: boolean | null;
  fail: boolean | null;
  dominantColor?: string;
  goBackDisabled: boolean;
  goForwardDisabled: boolean;
  showListenParty: boolean;
}

const initial: IUIState = {
  startingApp: true,
  viewLoading: false,
  viewLoadingText: 'loading...',
  success: null,
  fail: null,
  goBackDisabled: true,
  goForwardDisabled: true,
  showListenParty: false,
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
    .addCase(uiAction.setDominantColor,
      (state, action) => {
        state.dominantColor = action.payload;
        return state;
    })
    .addCase(uiAction.setBackButtonDisabled,
      (state, action) => {
        state.goBackDisabled = action.payload;
        return state;
    })
    .addCase(uiAction.setForwardButtonDisabled,
      (state, action) => {
        state.goForwardDisabled = action.payload;
        return state;
    })
    .addCase(uiAction.setListenPartyBoxDisplayStorage,
      (state, action) => {
        state.showListenParty = action.payload;
        return state;
    });
});