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
   * Identity action
   */
  signup: generateActionCreator('signup'),
  login: generateActionCreator('login'),


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

  /**
   * For artist actions
   */
  claimArtist: generateActionCreator('claimArtist'),

  /**
   * Others
   */
  getDominantColor: generateActionCreator('getDominantColor'),
};