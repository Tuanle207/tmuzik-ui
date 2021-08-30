import { createReducer } from '@reduxjs/toolkit';
import { IObject } from '../../utils/interfaces';
import { queueAction } from '../actions';
import { IPlayingAudioItem } from '../interface/queue';


export interface IQueueState extends IObject {
  queue: IPlayingAudioItem[],
  current: IPlayingAudioItem | null,
  loop: boolean;
  shuffle: boolean;
}

const initial: IQueueState = {
  queue: [],
  current: null,
  loop: false,
  shuffle: false
};

export const queueReducer = createReducer(initial, build => {
  build
    .addCase(queueAction.addAudio,
      (state, action) => {
        state.queue.push(action.payload);
        if (state.current === null) {
          state.current = action.payload
        }
        return state;
    })
    .addCase(queueAction.removeAudio,
      (state, action) => {
        const id = action.payload.id;
        const index = state.queue.findIndex((x) => x.id === id);
        if (index === -1) {
          return state;
        }
        state.queue.splice(index, 1);
        if (state.current?.id === id) {
          state.current = state.queue[index] ?? null;
        }
    })
    // .addCase(queueAction.goNext,
    //   (state, action) => {
    //     const { current } = state;
    //     const index = state.queue.findIndex((x) => x.id === current?.id);

    //     if (current && index !== -1) {
          
    //     }
    //     if (index === -1) {
    //       return state;
    //     }
    //     state.queue.splice(index, 1);
    //     if (state.current?.id === id) {
    //       state.current = state.queue[index] ?? null;
    //     }
    // })
    
});