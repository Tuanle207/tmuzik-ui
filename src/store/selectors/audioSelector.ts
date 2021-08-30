import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

export const audioSelector = {
  uploadedList: createSelector(
    (state: RootState) => 
      state.audio.uploadedList, 
    (uploadedList) => 
      uploadedList
  ),
};