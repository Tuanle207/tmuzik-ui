import BaseApiService from './base';

class AudioApiService extends BaseApiService {

  constructor() {
    super('audios');
  }

  uploadAudioAsync = async (input: API.UploadAudioRequest) => {
    const result = await this.postFormData<API.UploadAudioResponse>('', input);
    return result;
  }

  getUserUploadAudioAsync = async (input: API.GetUserUploadAudioRequest) => {
    const result = await this.get<API.GetUserUploadAudioResponse>('uploaded', input);
    return result;
  }
}

export const audioApiService = new AudioApiService();