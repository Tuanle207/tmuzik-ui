import httpClient from '../../configs/axios'
import { ApiRequest, ApiResponse } from '../interfaces';

export const authApi = {
  postLogin: async (input: ApiRequest.Login) => {
    const result = await httpClient.post<ApiResponse.Login>('/api/auth/login', input);
    return result;
  }
}