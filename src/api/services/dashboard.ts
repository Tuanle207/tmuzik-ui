import BaseApiService from './base';

class DashboardApiService extends BaseApiService {

  constructor() {
    super('dashboard');
  }

  getSearchResultsAsync = async (input: API.GetSearchResultsRequest) => {
    const result = await this.get<API.GetSearchResultsResponse>('search', input);
    return result;
  }
}

export const dashboardApiService = new DashboardApiService();