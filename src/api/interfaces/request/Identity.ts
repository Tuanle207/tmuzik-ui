export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  passwordConfirm: string;
  fullName: string;
  dob: Date;
}

export interface RefreshLoginRequest {
  refreshToken: string;
  userId: string;
}

export interface RevokeLoginRequest {
  refreshToken: string;
  userId: string;
}

export interface LoginWithFacebookRequest {
  fbAccessToken: string;
}