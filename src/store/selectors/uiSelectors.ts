import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

export const uiSelector = {
  startingApp: createSelector(
    (state: RootState) => 
      state.ui.startingApp, 
    (startingApp) => 
      startingApp
  )
};