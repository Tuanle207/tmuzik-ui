import { createAction } from '@reduxjs/toolkit';
import { IPlayingAudioItem } from '../interface/queue';

export const queueAction = {
  addAudio: createAction(
    'app/queue/addAudio',
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
    'app/queue/playNext',
    (payload: { id: string }) => ({payload}),
  ),
  goPrevious: createAction(
    'app/queue/playPrevious',
    (payload: { id: string }) => ({payload}),
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
}