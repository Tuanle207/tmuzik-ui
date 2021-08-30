import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

export const queueSelectors = {
  queue: createSelector(
    (state: RootState) => state.queue.queue, 
    (queue) => queue
  ),
  current: createSelector(
    (state: RootState) => state.queue.current, 
    (current) => current
  ),
  loop: createSelector(
    (state: RootState) => state.queue.loop, 
    (loop) => loop
  ),
  shuffle: createSelector(
    (state: RootState) => state.queue.shuffle, 
    (shuffle) => shuffle
  ),
};