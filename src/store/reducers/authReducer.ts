import { createReducer } from '@reduxjs/toolkit';
import { IFbAuthResponse } from '../../configs/fb/IFbAuthResponse';
import { authAction } from '../actions';

export interface IAuthState {
  isAuthenticated: boolean; 
  token: string;
  expiryTime: string;
  refreshToken: string;
  fb: IFbAuthResponse | null;
  userProfile: ApiResponse.LoginResponseData | null; 
}

const initial: IAuthState = {
  isAuthenticated: false,
  token: '',
  expiryTime: '',
  refreshToken: '',
  fb: null,
  userProfile: null
};

export const authReducer = createReducer(initial, (builder) => 
  builder
    .addCase(authAction.setLoginStorage,
      (state, action) => {
        state.refreshToken = action.payload.token.refreshToken;
        state.token = action.payload.token.accessToken;
        state.expiryTime = action.payload.token.accessTokenExpiresAt;
        state.userProfile = action.payload.data;
        state.isAuthenticated = true;
        return state;
      }
    )
    .addCase(authAction.setFbIdentityStorage,
      (state, action) => {
        state.fb = action.payload;
        return state;
      }
    )
    .addCase(authAction.setAuthenticationStatus,
      (state, action) => {
        state.isAuthenticated = action.payload;
        return state;
      }
    )
    .addCase(authAction.setRefreshTokenResult,
      (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload.accessToken;
        state.expiryTime = action.payload.accessTokenExpiresAt;
        return state;
      }
    )
    .addCase(authAction.setToken,
      (state, action) => {
        state.token = action.payload.accessToken;
        state.expiryTime = action.payload.accessTokenExpiresAt;
        state.refreshToken = action.payload.refreshToken;
      }
    )
    .addCase(authAction.setUserProfile,
      (state, action) => {
        state.userProfile = action.payload;
      }
    )
);