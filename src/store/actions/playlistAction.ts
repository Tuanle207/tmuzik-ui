import { createAction } from '@reduxjs/toolkit';

export const playlistAction = {
  createPlaylist: createAction(
    'app/playlist/createPlaylist',
    (payload: API.CreatePlaylistRequest) => ({payload})
  ),
  updatePlaylist: createAction(
    'app/playlist/updatePlaylist',
    (payload: API.UpdatePlaylistRequest) => ({payload})
  ),
  removePlaylist: createAction(
    'app/playlist/removePlaylist',
    (payload: string) => ({payload})
  ),
  removePlaylistStorage: createAction(
    'app/playlist/removePlaylistStorage',
    (payload: string) => ({payload})
  ),
  getUserPlaylists: createAction(
    'app/playlist/getUserPlaylists'
  ),
  setUserPlaylistsStorage: createAction(
    'app/playlist/setUserPlaylistsStorage',
    (payload: API.UserPlaylist[]) => ({payload})
  ),
  getPlaylistDetail: createAction(
    'app/playlist/getPlaylistDetail',
    (payload: string) => ({payload})
  ),
  setPlaylistDetailStorage: createAction(
    'app/playlist/setPlaylistDetailStorage',
    (payload: API.PlaylistDetail) => ({payload})
  ),
  addPlaylistItem: createAction(
    'app/playlist/addPlaylistItem',
    (payload: { id: string; items: string[]; }) => ({payload})
  ),
  setPlaylistItemStorage: createAction(
    'app/playlist/setPlaylistItemStorage',
    (payload: {id: string; items: API.AudioItem[];}) => ({payload})
  ),
  removePlaylistItem: createAction(
    'app/playlist/removePlaylistItem',
    (payload: { id: string, items: string[] }) => ({payload})
  ),
  removePlaylistItemStorage: createAction(
    'app/playlist/removePlaylistItemStorage',
    (payload: { id: string, items: string[] }) => ({payload})
  )
}