import { PageModelResponse } from '../../../utils/interfaces';
import { SimpleAlbum } from './Album';
import { SimpleArtist } from './Artist';
import { Creator } from './User';


export interface AudioItem {
  id: string;
  name: string;
  artistTag: string;
  artist: SimpleArtist;
  albumTag: string;
  album: SimpleAlbum;
  description: string;
  length: number;
  genre: string;
  privacy: string;
  cover: string;
  file: string;
  creationTime: string;
  creator: Creator;
  plays: number;
  loves: number;
}

export interface UserUploadAudio {
  id: string;
  name: string;
  artists: string;
  albumTag: string;
  artist: SimpleArtist;
  description: string;
  length: number;
  genre: string;
  privacy: string;
  cover: string;
  file: string;
  creationTime: string;
}

export interface UploadAudioResponse {
  id: string;
  name: string;
  artists: string;
  description: string;
  albumTag: string;
  length: number;
  genre: string;
  privacy: string;
  cover: string;
  file: string;
}
export interface GetUserUploadAudioResponse extends PageModelResponse<UserUploadAudio>
{

}