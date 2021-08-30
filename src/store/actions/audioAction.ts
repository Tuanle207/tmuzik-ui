import { createAction } from '@reduxjs/toolkit';
import { IPaginationStatusPayload } from '../interface/common';

export const audioAction = {
  
  // post user audio
  postUploadAudio: createAction(
    'app/audio/uploadAudio',
    (payload: ApiRequest.UploadAudio) => ({payload}),
  ),

  // get user upload audio
  getUserUploadAudio: createAction(
    'app/audio/getUserUploadAudio',
    (payload: ApiRequest.GetUserUploadAudio) => ({payload}),
  ),
  setUserUploadAudioStorage: createAction(
    'app/audio/setUserUploadAudioStorage',
    (payload: ApiResponse.GetUserUploadAudio) => ({payload}),
  ),
  setUserUploadAudioStatus: createAction(
    'app/audio/setUserUploadAudioStatus',
    (payload: IPaginationStatusPayload) => ({payload}),
  )
};