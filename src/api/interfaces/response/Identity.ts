export interface AccessToken {
  accessToken: string;
  accessTokenExpiresAt: string;
}

export interface LoginResponseData {
  id: string;
  email: string;
  fullName: string;
  avatar: string;
  dob: string;
}

export interface LoginResponseToken extends AccessToken {
  refreshToken: string;
}

export interface Login {
  token: LoginResponseToken;
  data: LoginResponseData;
}

export interface RefreshLogin extends AccessToken {}

export interface Signup {
  message: string;
}