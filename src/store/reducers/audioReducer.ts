import { createReducer } from '@reduxjs/toolkit';
import { IObject } from '../../utils/interfaces';
import { audioAction } from '../actions';
import { IPaginationModelState } from '../interface/common';


export interface IAudioState extends IObject {
  uploadedList: IPaginationModelState<API.AudioItem>;
}

const initial: IAudioState = {
  uploadedList: {
    items: [],
    pageIndex: 0,
    pageSize: 0,
    totalCount: 0,
    loading: false,
  }
};

export const audioReducer = createReducer(initial, build => {
  build
    .addCase(audioAction.setUserUploadAudioStorage, (state , action) => {
      state.uploadedList.items = [...state.uploadedList.items, ...action.payload.items];
      state.uploadedList.pageIndex = action.payload.pageIndex || 1;
      state.uploadedList.pageSize = action.payload.pageSize || 0;
      state.uploadedList.totalCount = action.payload.totalCount || 0;
      return state;
    })
    .addCase(audioAction.setUserUploadAudioStatus, (state , action) => {
      state.uploadedList.loading = action.payload.loading;
      state.uploadedList.error = action.payload.error;
      return state;
    })
});