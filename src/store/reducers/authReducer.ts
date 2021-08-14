import { createReducer } from '@reduxjs/toolkit';
import { FbAuthStatus } from '../../configs/fb/FbAuthStatus';
import { IFbAuthResponse } from '../../configs/fb/IFbAuthResponse';
import { authAction } from '../actions';

export interface IAuthState {
  internal: {
    token: string;
    expiryTime: string;
    refreshToken: string;
  },
  fb: IFbAuthResponse,
  userProfile: any; 
}

const initial: IAuthState = {
  internal: {
    token: '',
    expiryTime: '',
    refreshToken: ''
  },
  fb: {
    status: FbAuthStatus.Unknown,
    authResponse: {
      accessToken: '',
      expiresIn: 0,
      signedRequest: '',
      userID: '',
      data_access_expiration_time: 0,
      graphDomain: ''
    }
  },
  userProfile: {}
};

export const authReducer = createReducer(initial, (builder) => 
  builder
    .addCase(authAction.setLoginStorage,
      (state, action) => {
        state.internal.token = action.payload.token;
        state.userProfile = action.payload;
        return state;
      }
    )
    .addCase(authAction.setFbIdentityStorage,
      (state, action) => {
        state.fb = action.payload;
        return state;
      }
    )
    .addCase(authAction.setFbUserProfile,
      (state, action) => {
        state.userProfile = action.payload;
        return state;
      }
    )

);