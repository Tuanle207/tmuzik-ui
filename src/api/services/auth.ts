import BaseApiService from './base';

class AuthApiService extends BaseApiService {

  constructor() {
    super('auth');
  }

  loginAsync = async (input: API.LoginRequest) => {
    const result = await this.post<API.LoginResponse>('login', input);
    return result;
  }

  loginWithFbAsync = async (input: API.LoginWithFacebookRequest) => {
    const result = await this.post<API.LoginResponse>('loginWithFacebook', input);
    return result; 
  }

  signupAsync = async (input: API.SignupRequest) => {
    const result = await this.post<API.SignupResponse>('signup', input);
    return result;
  }

  refreshLoginAsync = async (input: API.RefreshLoginRequest) => {
    const result = await this.post<API.RefreshLoginResponse>('refresh', input);
    return result;
  }

  revokeLoginAsync = async (input: API.RevokeLoginRequest) => {
    return await this.post<void>('revoke', input);
  }
}

export const authApiService = new AuthApiService();

