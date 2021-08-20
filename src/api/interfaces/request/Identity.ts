export interface Login {
  email: string;
  password: string;
}

export interface Signup {
  email: string;
  password: string;
  passwordConfirm: string;
  fullName: string;
  dob: string;
}

export interface RefreshLogin {
  refreshToken: string;
  userId: string;
}

export interface RevokeLogin {
  refreshToken: string;
  userId: string;
}

export interface LoginWithFacebook {
  fbAccessToken: string;
}