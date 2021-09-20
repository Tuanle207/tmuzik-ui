import BaseApiService from './base';

class ArtistApiService extends BaseApiService {

  constructor() {
    super('artists');
  }

  claimArtistAsync = async (input: API.ClaimArtistRequest) => {
    const result = await this.postFormData<void>('', input);
    return result;
  }

}

export const artistApiService = new ArtistApiService();