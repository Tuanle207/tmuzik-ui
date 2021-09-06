import { createMatchSelector } from 'connected-react-router';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store'

export const paramsSelectorCreator = <TParams> (path: string) => {
  return (state: RootState): TParams => {
    const matchSelector = createMatchSelector<RootState, TParams>(path);
    
    const select = matchSelector(state);
  
    return select?.params ?? {} as TParams;
  };
};

export const taskStateSelectorCreator = (actionName: string) => {
  const PATTERN = /(app\/taskState)\/(.*)/;
  const matches = PATTERN.exec(actionName);
  
  if (!matches) {
    throw Error('Invalid action name!');
  }

  const taskName = matches[2];

  return createSelector(
    (state: RootState) => state.taskState[taskName] || { state: 'idle' },
    (taskState) => taskState
  );
};

export const playlistDetailSelectorCreator = (playlistId: string) => createSelector(
  (state: RootState) => state.playlist.playlistDetails,
  (playlistDetails) => playlistDetails.find((x) => x.id === playlistId)
);