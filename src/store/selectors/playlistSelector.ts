import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

export const playlistSelector = {
  userPlaylists: createSelector(
    (state: RootState) => state.playlist.userPlaylists, 
    (userPlaylists) => userPlaylists.map(({id, name, cover, description}) => ({id, name, cover, description}))
  ),
};