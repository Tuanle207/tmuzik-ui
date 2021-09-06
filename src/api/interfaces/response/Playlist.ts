import { Creator } from './User';
import { PageModelResponse } from '../../../utils/interfaces';
import { AudioItem } from './Audio';

export interface UserPlaylist {
  id: string;
  name: string;
  description: string;
  cover: string;
}

export interface CreatePlaylistResponse extends UserPlaylist {
  
}

export interface UpdatePlaylistResponse extends UserPlaylist {
  
}

export interface GetUserPlaylistResponse extends PageModelResponse<UserPlaylist> {

}

export interface PlaylistDetail {
  id: string;
  name: string;
  description: string;
  cover: string;
  privacy: string;
  creationTime: string;
  creator: Creator;
  items: AudioItem[];
}

export interface AddPlaylistItemResponse extends PageModelResponse<AudioItem> {

}