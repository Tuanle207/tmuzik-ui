import BaseApiService from './base';

class PlaylistApiService extends BaseApiService {

  constructor() {
    super('playlists');  
  }

  getUserPlaylistsAsync = async () => {
    const result = await this.get<API.GetUserPlaylistResponse>('uploaded');
    return result;
  }

  getPlaylistDetailAsync = async (playlistId: string) => {
    const result = await this.get<API.PlaylistDetail>(playlistId);
    return result;
  }

  createPlaylistAsync = async (input: API.CreatePlaylistRequest) => {
    const result = await this.postFormData<API.CreatePlaylistResponse>('', input);
    return result;
  }

  updatePlaylistAsync = async (input: API.UpdatePlaylistRequest) => {
    const playlistId = input.id;
    const result = await this.postFormData<API.UpdatePlaylistResponse>(playlistId, input)
    return result;
  }

  removePlaylistAsync = async (playlistId: string) => {
    const result = await this.delete(playlistId)
    return result;
  }

  addPlaylistItemAsync = async (playlistId: string, input: API.AddPlaylistItemRequest) => {
    var result = await this.post<API.AddPlaylistItemResponse>(`${playlistId}/add-items`, input);
    return result;
  }

  removePlaylistItemAsync = async (playlistId: string, input: API.RemovePlaylistItemRequest) => {
    await this.post(`${playlistId}/remove-items`, input);
  }

}

export const playlistApiService = new PlaylistApiService();