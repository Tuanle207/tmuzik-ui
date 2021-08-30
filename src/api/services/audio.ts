import httpClient from '../../configs/axios';

class AudioApiService {
  async postUploadAudioAsync(input: ApiRequest.UploadAudio) {
    const result = await httpClient.postFormData<ApiResponse.UploadAudio>('/api/audios', input);
    return result;
  }

  async getUserUploadAudioAsync(input: ApiRequest.GetUserUploadAudio) {
    const result = await httpClient.get<ApiResponse.GetUserUploadAudio>('/api/audios/uploaded', input);
    return result;
  }
}

export const audioApiService = new AudioApiService();