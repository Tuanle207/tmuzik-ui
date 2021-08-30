import { createReducer } from '@reduxjs/toolkit';
import { IObject } from '../../utils/interfaces';
import { queueAction } from '../actions';
import { IPlayingAudioItem } from '../interface/queue';


export interface IQueueState extends IObject {
  queue: IPlayingAudioItem[],
  current: IPlayingAudioItem | null,
  loop: boolean;
  shuffle: boolean;
  canPlayNext: boolean;
}

const initial: IQueueState = {
  queue: [],
  current: null,
  loop: false,
  shuffle: false,
  canPlayNext: false,
};

export const queueReducer = createReducer(initial, build => {
  build
    .addCase(queueAction.addAudio,
      (state, action) => {
        state.queue.push(action.payload);
  
        // no item is is being played -> set playing item to payload. also, canPlayNext flag at this time probably has FALSE value
        if (state.current === null) {
          state.current = action.payload
        }
        // else check & set canPlayNext flag to true
        else {
          const index = state.queue.findIndex((x) => x.id === state.current?.id);
          if (state.queue[index + 1]) {
            state.canPlayNext = true;
          }
        }
        return state;
    })
    .addCase(queueAction.removeAudio,
      (state, action) => {
        const id = action.payload.id;
        const index = state.queue.findIndex((x) => x.id === id);
        if (index === -1) { return state; }

        // delete item from queue
        state.queue.splice(index, 1);

        // change playing item to next item in queue/null
        if (state.current?.id === id) {
          state.current = state.queue[index] ?? null;
        }

        // check & set canPlayNext flag to false
        if (!state.queue[index + 1]) {
          state.canPlayNext = false;
        }
        return state;
    })
    .addCase(queueAction.goNext,
      (state) => {

        // in shuffle mode
        if (state.shuffle) {
          const randomIndex = Math.floor(Math.random() * state.queue.length);
          state.current = state.queue[randomIndex];
          return state;
        }

        const index = state.queue.findIndex((x) => x.id === state.current?.id);

        // when loop is turn on & playing item is the last one in queue
        if (!state.queue[index + 1] && state.loop) {
          state.current = state.queue[0];
          if (state.queue[1]) {
            state.canPlayNext = true;
          }
          return state;
        }

        // change playing item to the next in queue
        if (state.queue[index + 1]) {
          state.current = state.queue[index + 1];
        }

        // check & set canPlayNext flag to false
        if (!state.queue[index + 2]) {
          state.canPlayNext = false;
        }

        return state;
    })
    .addCase(queueAction.goPrevious, 
      (state) => {
        const index = state.queue.findIndex((x) => x.id === state.current?.id);

        // in shuffle mode
        if (state.shuffle) {
          const randomIndex = Math.floor(Math.random() * state.queue.length);
          state.current = state.queue[randomIndex];
          return state;
        }

        // change playing item to the previous in queue
        if (state.queue[index - 1]) {
          state.current = state.queue[index + 1];
          state.canPlayNext = true;
        }
        return state;
    })
    .addCase(queueAction.goTo,
      (state, action) => {
        const id = action.payload.id;
        const index = state.queue.findIndex((x) => x.id === id);
        
        // change playing item to the item with that id in queue
        if (state.queue[index]) {
          state.current = state.queue[index];
        }

        // check & set canPlayNext flag to true
        if (state.queue[index + 1]) {
          state.canPlayNext = true;
        }
        return state;
    })
    .addCase(queueAction.clearQueue,
      (state) => {
        state.queue = [];
        state.current = null;
        state.canPlayNext = false;
        return state;
    })
    .addCase(queueAction.setShuffle,
      (state, action) => {
        if (action.payload) {
          state.shuffle = true;
          state.canPlayNext = true;
        } else {
          const index = state.queue.findIndex((x) => x.id === state.current?.id);
          if (!state.queue[index + 1]) {
            state.canPlayNext = false;
          }
        }
        return state;
    })
    .addCase(queueAction.setLoop,
      (state, action) => {
        if (action.payload) {
          state.loop = true;
          state.canPlayNext = true;
        } else {
          const index = state.queue.findIndex((x) => x.id === state.current?.id);
          if (!state.queue[index + 1]) {
            state.canPlayNext = false;
          }
        }
        return state;
    })
    
});