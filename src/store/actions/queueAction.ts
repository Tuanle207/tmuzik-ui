import { createAction } from '@reduxjs/toolkit';
import { IPlayingAudioItem, PlayingState } from '../interface/queue';

export const queueAction = {
  addAudio: createAction(
    'app/queue/addAudio',
    (payload: IPlayingAudioItem) => ({payload})
  ),
  addAndPlayAudio: createAction(
    'app/queue/addAndPlayAudio',
    (payload: IPlayingAudioItem) => ({payload})
  ),
  removeAudio: createAction(
    'app/queue/removeAudio',
    (payload: { id: string }) => ({payload}),
  ),
  clearQueue: createAction(
    'app/queue/clearQueue'
  ),
  goNext: createAction(
    'app/queue/goNext',
  ),
  goPrevious: createAction(
    'app/queue/goPrevious',
  ),
  goTo: createAction(
    'app/queue/goTo',
    (payload: { id: string }) => ({payload}),
  ),
  setShuffle: createAction(
    'app/queue/setShuffle',
    (payload: boolean) => ({payload}),
  ),
  setLoop: createAction(
    'app/queue/setLoop',
    (payload: boolean) => ({payload}),
  ),
  changePlayingStatus: createAction(
    'app/queue/changePlayingStatus',
    (payload: PlayingState) => ({payload})
  )
}