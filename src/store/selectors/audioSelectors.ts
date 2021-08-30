import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

export const audioSelectors = {
  uploadedList: createSelector(
    (state: RootState) => 
      state.audio.uploadedList, 
    (uploadedList) => 
      uploadedList
  ),
};