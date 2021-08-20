import httpClient from '../../configs/axios'

class AuthApiService {

  async postLoginAsync(input: ApiRequest.Login) {
    const result = await httpClient.post<ApiResponse.Login>('/api/auth/login', input);
    return result;
  }

  async postLoginWithFbAsync(input: ApiRequest.LoginWithFacebook) {
    const result = await httpClient.post<ApiResponse.Login>('/api/auth/loginWithFacebook', input);
    return result; 
  }

  async signupAsync(input: ApiRequest.Signup) {
    const result = await httpClient.post<ApiResponse.Signup>('/api/auth/signup', input);
    return result;
  }

  async refreshLoginAsync(input: ApiRequest.RefreshLogin) {
    const result = await httpClient.post<ApiResponse.RefreshLogin>('/api/auth/refresh', input);
    return result;
  }

  async revokeLoginAsync(input: ApiRequest.RevokeLogin) {
    return await httpClient.post<void>('/api/auth/revoke', input);
  }
}

export const authApiService = new AuthApiService();

