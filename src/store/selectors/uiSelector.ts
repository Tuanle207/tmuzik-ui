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
  goBackDisabled: createSelector(
    (state: RootState) => state.ui.goBackDisabled, 
    (goBackDisabled) => goBackDisabled
  ),
  goForwardDisabled: createSelector(
    (state: RootState) => state.ui.goForwardDisabled, 
    (goForwardDisabled) => goForwardDisabled
  ),
  showListenParty: createSelector(
    (state: RootState) => state.ui.showListenParty, 
    (showListenParty) => showListenParty
  )
};