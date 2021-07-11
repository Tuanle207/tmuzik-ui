import httpClient from '../../configs/axios';

export const DemoApi = {
  getTestApi: async () => {
    const result = await httpClient.get('/api/test');
    return result;
  },
}