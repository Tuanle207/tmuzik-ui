import { createReducer } from '@reduxjs/toolkit';
import { playlistAction } from '../actions';


export interface IPlaylist {
  userPlaylists: API.UserPlaylist[];
  playlistDetails: API.PlaylistDetail[];
}

const intial: IPlaylist = {
  userPlaylists: [],
  playlistDetails: []
};

export const playlistReducer = createReducer(intial, builder => {
  builder
    .addCase(playlistAction.setUserPlaylistsStorage, (state, action) => {
      const items = action.payload;
      items.forEach((item) => {
        
        const index = state.userPlaylists.findIndex((x) => x.id === item.id);
        if (index !== -1) {
          state.userPlaylists[index] = item;
        } else {
          state.userPlaylists.unshift(item);
        }

        const detailIndex = state.playlistDetails.findIndex((x) => x.id === item.id);
        if (index !== -1) {
          state.playlistDetails.splice(detailIndex, 1);
        }
      });
      return state;
    })
    .addCase(playlistAction.setPlaylistDetailStorage, (state, action) => {
      const index = state.userPlaylists.findIndex((x) => x.id === action.payload.id);
      if (index !== -1) {
        state.playlistDetails.push(action.payload);
      }
      return state;
    })
    .addCase(playlistAction.setPlaylistItemStorage, (state, action) => {
      const detail = state.playlistDetails.find((x) => x.id === action.payload.id);

      if (detail) {
        detail.items = [...detail.items, ...action.payload.items];
      }
      return state;
    })
    .addCase(playlistAction.removePlaylistStorage, (state, action) => {
      const indexInUserPlaylists = state.userPlaylists.findIndex((x) => x.id === action.payload);
      const indexInPlaylistDetails = state.playlistDetails.findIndex((x) => x.id === action.payload);
      if (indexInUserPlaylists !== -1) {
        state.userPlaylists.splice(indexInUserPlaylists, 1);
      }
      if (indexInPlaylistDetails !== -1) {
        state.playlistDetails.splice(indexInPlaylistDetails, 1);
      }
      return state;
    })
    .addCase(playlistAction.removePlaylistItemStorage, (state, action) => {
      const detail = state.playlistDetails.find((x) => x.id === action.payload.id);
      if (detail) {
        action.payload.items.forEach((audioId) => {
          const audioIndex = detail.items.findIndex((x) => x.id === audioId);
          if (audioIndex !== -1) {
            detail.items.splice(audioIndex, 1);
          }
        });          
      }
      return state;
    })
});