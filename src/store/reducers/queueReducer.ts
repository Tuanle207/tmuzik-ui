import { createReducer } from '@reduxjs/toolkit';
import { AudioItem } from '../../@types/API';
import { IObject } from '../../utils/interfaces';
import { queueAction } from '../actions';
import { PlayingState } from '../interface/queue';


export interface IQueueState extends IObject {
  queue: AudioItem[],
  current: AudioItem | null,
  loop: boolean;
  shuffle: boolean;
  canPlayNext: boolean;
  canPlayPrevious: boolean;
  playingStatus: PlayingState;
}

const initial: IQueueState = {
  queue: [],
  current: null,
  loop: false,
  shuffle: false,
  canPlayNext: false,
  canPlayPrevious: false,
  playingStatus: 'pause',
};

export const queueReducer = createReducer(initial, build => {
  build
    .addCase(queueAction.changePlayingStatus, (state, action) => {
      state.playingStatus = action.payload;
      return state;
    })
    .addCase(queueAction.addAudio, (state, action) => {
        
      // add item into queue
      state.queue.push(action.payload);

      // no item is is being played -> set playing item to payload. also, canPlayNext flag at this time probably has FALSE value
      if (state.current === null) {
        state.current = action.payload;
      } else {
        state.canPlayNext = true;
      }
      return state;
    })
    .addCase(queueAction.addAndPlayAudio, (state, action) => {
      // there's no items in queue
      if (state.current === null) {
        state.queue.push(action.payload);
        state.current = action.payload;
        return state;
      }  
      // there's some items in queue
      const index = state.queue.findIndex((x) => x.id === state.current?.id);
      state.queue.splice(index + 1, 0, action.payload);
      state.current = state.queue[index + 1];

      if (state.loop || state.shuffle) {
        return state;
      }
      if (!state.queue[index + 2]) {
        state.canPlayNext = false;
      }
      state.canPlayPrevious = true;
      
      return state;
    })
    .addCase(queueAction.removeAudio, (state, action) => {
      const id = action.payload.id;
      const index = state.queue.findIndex((x) => x.id === id);
      if (index === -1) { return state; }

      // delete item from queue
      state.queue.splice(index, 1);
      state.queue = [...state.queue];

      // playing item is not this deleted item
      if (state.current?.id !== id) {

        if (state.loop || state.shuffle) {
          return state;
        }

        const playingIndex = state.queue.findIndex((x) => x.id === state.current?.id) 
        // the deleled item is the playing's previous one
        if (playingIndex !== -1 && index === playingIndex && index - 1 < 0) {
          state.canPlayPrevious = false;
        }
        // the deleled item is the playing's following one
        if (playingIndex !== -1 && index === playingIndex + 1 && index === state.queue.length) {
          state.canPlayNext = true;
        }

        return state;
      }

      // in shuffle mode
      if (state.shuffle) {
        const randomIndex = Math.floor(Math.random() * state.queue.length);
        state.current = state.queue[randomIndex];
        // state.canPlayNext = true;
        return state;
      }

      // when loop is turn on & deleted item is the last one in queue
      if (!state.queue[index] && state.loop) {
        state.current = state.queue[0];
        return state;
      }

      // change playing item to next item in queue/null
      state.current = state.queue[index] ?? null;

      if (state.loop || state.shuffle) {
        return state;
      }
      // check & set canPlayNext flag to false
      if (!state.queue[index + 1]) {
        state.canPlayNext = false;
      }
      if (!state.queue[index - 1]) {
        state.canPlayPrevious = false;
      }
      return state;
    })
    .addCase(queueAction.goNext, (state) => {
      // in shuffle mode
      if (state.shuffle) {
        const randomIndex = Math.floor(Math.random() * state.queue.length);
        state.current = state.queue[randomIndex];
        // state.canPlayNext = true;
        return state;
      }

      const index = state.queue.findIndex((x) => x.id === state.current?.id);

      // when loop is turn on & playing item is the last one in queue
      if ( !state.queue[index + 1] && state.loop) {
        state.current = state.queue[0];
        return state;
      }

      // change playing item to the next in queue
      if (state.queue[index + 1]) {
        state.current = state.queue[index + 1];
      }

      if (state.loop || state.shuffle) {
        return state;
      }

      state.canPlayPrevious = true;

      // check & set canPlayNext flag to false
      if (!state.queue[index + 2]) {
        state.canPlayNext = false;
      }

      return state;
    })
    .addCase(queueAction.goPrevious, (state) => {
      // in shuffle mode
      if (state.shuffle) {
        const randomIndex = Math.floor(Math.random() * state.queue.length);
        state.current = state.queue[randomIndex];
        return state;
      }

      const index = state.queue.findIndex((x) => x.id === state.current?.id);

      // when loop is turn on & playing item is the first one in queue
      if (!state.queue[index - 1] && state.loop) {
        state.current = state.queue[state.queue.length];
        return state;
      }

      // change playing item to the previous in queue
      if (state.queue[index - 1]) {
        state.current = state.queue[index - 1];
      }

      if (state.loop || state.shuffle) {
        return state;
      }

      state.canPlayNext = true;

      // check & set canPlayPrevious flag to true
      if (!state.queue[index - 2]) {
        state.canPlayPrevious = false;
      }

      return state;
    })
    .addCase(queueAction.goTo, (state, action) => {
      const id = action.payload.id;
      const index = state.queue.findIndex((x) => x.id === id);
      
      // change playing item to the item with that id in queue
      if (state.queue[index]) {
        state.current = state.queue[index];
      }

      // check & set canPlayNext & canPlayPrevious flag to true
      if (state.loop || state.shuffle) {
        return state;
      }

      if (state.queue[index + 1]) {
        state.canPlayNext = true;
      }

      if (!state.queue[index - 1]) {
        state.canPlayPrevious = true;
      }

      return state;
    })
    .addCase(queueAction.clearQueue, (state) => {
      state.queue = [];
      state.current = null;
      state.canPlayNext = false;
      state.canPlayPrevious = false;
      return state;
    })
    .addCase(queueAction.setShuffle, (state, action) => {
      if (action.payload) {
        state.shuffle = true;
        state.canPlayNext = true;
        state.canPlayPrevious = true;
        return state;
      } 
      state.shuffle = false;
      if (!state.loop) {
        const index = state.queue.findIndex((x) => x.id === state.current?.id);
        if (!state.queue[index + 1]) {
          state.canPlayNext = false;
        }
        if (!state.queue[index - 1]) {
          state.canPlayPrevious = false;
        }
      }
      return state;
    })
    .addCase(queueAction.setLoop, (state, action) => {
      if (action.payload) {
        state.loop = true;
        state.canPlayNext = true;
        state.canPlayPrevious = true;
        return state;
      }
      state.loop = false;
      if (!state.shuffle) {
        const index = state.queue.findIndex((x) => x.id === state.current?.id);
        if (!state.queue[index + 1]) {
          state.canPlayNext = false;
        }
        if (!state.queue[index - 1]) {
          state.canPlayPrevious = false;
        }
      }
      return state;
    })
    .addCase(queueAction.playAlbumOrPlaylist, (state, action) => {
      state.queue = action.payload;
      state.current = state.queue[0] ?? null;
      if (state.queue[1]) {
        state.canPlayNext = true;
      }
      return state;
    })
});