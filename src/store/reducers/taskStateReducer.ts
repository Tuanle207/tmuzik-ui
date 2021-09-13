import { createReducer } from '@reduxjs/toolkit';
import { IObject } from '../../utils/interfaces';
import { ITaskStateItem } from '../interface/taskState';

export type ITaskState = IObject<ITaskStateItem>;

const initial: IObject = { };

const PATTERN = /(app\/taskState)\/(.*)/;

export const taskStateReducer = createReducer(initial, (builder) => {
  builder
    .addDefaultCase((state, action) => {
      const matches = PATTERN.exec(action.type);
      if (!matches) {
        return state;
      }
      const taskName = matches[2];
      const payload: ITaskStateItem = action.payload;
      state[taskName] = payload;
      if (payload.state === 'error') {
        state[taskName].error = payload.error || 'Unknown error has occurred!'
      }
      return state;
    }  
  )
});