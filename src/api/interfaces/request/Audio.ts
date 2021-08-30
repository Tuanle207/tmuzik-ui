import { PageModelRequest } from '../../../utils/interfaces';

export interface UploadAudio {
  name: string;
  artists: string;
  albumTag?: string;
  description?: string;
  length: number;
  genre: string;
  privacy: string;
  coverFile: File | null;
  audioFile: File;
}

export interface GetUserUploadAudio extends PageModelRequest {

}