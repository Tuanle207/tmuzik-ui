import { PageModelResponse } from '../../../utils/interfaces';
import { SimpleArtist } from './Artist';

export interface UploadAudio {
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

export interface GetUserUploadAudio extends PageModelResponse<UserUploadAudio>
{

}