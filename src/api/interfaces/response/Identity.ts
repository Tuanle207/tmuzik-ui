export interface AccessTokenResponse {
  accessToken: string;
  accessTokenExpiresAt: string;
}

export interface LoginResponseData {
  id: string;
  profileId: string;
  email: string;
  verified: boolean;
  creationTime: string;
  fullName: string;
  dob: string;
  avatar?: string;
  cover?: string;
  isPremium: boolean;
  isArtist: boolean;
}

export interface LoginResponseToken extends AccessTokenResponse {
  refreshToken: string;
}

export interface LoginResponse {
  token: LoginResponseToken;
  data: LoginResponseData;
}

export interface RefreshLoginResponse extends AccessTokenResponse {}

export interface SignupResponse {
  message: string;
}