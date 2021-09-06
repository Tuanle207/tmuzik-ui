import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

export const uiSelector = {
  startingApp: createSelector(
    (state: RootState) => state.ui.startingApp, 
    (startingApp) => startingApp
  ),
  viewLoading: createSelector(
    (state: RootState) => state.ui.viewLoading, 
    (viewLoading) => viewLoading
  ),
  viewLoadingText: createSelector(
    (state: RootState) => state.ui.viewLoadingText, 
    (viewLoadingText) => viewLoadingText
  ),
  success: createSelector(
    (state: RootState) => state.ui.success, 
    (success) => success
  ),
  dominantColor: createSelector(
    (state: RootState) => state.ui.dominantColor, 
    (dominantColor) => dominantColor
  ),
};