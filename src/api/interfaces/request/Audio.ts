import { PageModelRequest } from '../../../utils/interfaces';

export interface UploadAudioRequest {
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

export interface GetUserUploadAudioRequest extends PageModelRequest {

}