import { createAction } from '@reduxjs/toolkit';
import { IPaginationStatusPayload } from '../interface/common';

export const audioAction = {
  
  // post user audio
  postUploadAudio: createAction(
    'app/audio/uploadAudio',
    (payload: API.UploadAudioRequest) => ({payload}),
  ),

  // get user upload audio
  getUserUploadAudio: createAction(
    'app/audio/getUserUploadAudio',
    (payload: API.GetUserUploadAudioRequest) => ({payload}),
  ),
  setUserUploadAudioStorage: createAction(
    'app/audio/setUserUploadAudioStorage',
    (payload: API.GetUserUploadAudioResponse) => ({payload}),
  ),
  setUserUploadAudioStatus: createAction(
    'app/audio/setUserUploadAudioStatus',
    (payload: IPaginationStatusPayload) => ({payload}),
  )
};