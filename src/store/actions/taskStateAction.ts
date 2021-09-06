import { createAction } from '@reduxjs/toolkit';
import { ITaskStateItem } from '../interface/taskState';


const generateActionCreator = (actionName: string) => {
  return createAction(
    `app/taskState/${actionName}`,
    (payload: ITaskStateItem) => ({payload})
  );
};

export const taskStateAction = {

  /**
   * For playlist actions
   */
  createPlaylist: generateActionCreator('createPlaylist'),
  updatePlaylist: generateActionCreator('updatePlaylist'),
  removePlaylist: generateActionCreator('removePlaylist'),
  getUserPlaylists: generateActionCreator('getUserPlaylists'),
  getPlaylistDetail: generateActionCreator('getPlaylistDetail'),
  addPlaylistItem: generateActionCreator('addPlaylistItem'),
  removePlaylistItem: generateActionCreator('removePlaylistItem'),


  /**
   * For audio actions
   */
};