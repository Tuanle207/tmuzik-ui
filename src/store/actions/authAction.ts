import { createAction } from '@reduxjs/toolkit';
import { IFbAuthResponse } from '../../configs/fb/IFbAuthResponse';

export const authAction = {
  postLogin: createAction(
    'app/auth/postLogin',
    (payload: API.LoginRequest) => ({ payload })
  ),
  checkLogin: createAction(
    'app/auth/checkLogin'),
  setLoginStorage: createAction(
    'app/auth/setLoginStorage',
    (payload: API.LoginResponse) => ({ payload })
  ),
  postFbLogin: createAction(
    'app/auth/postFbLogin'),
  setFbIdentityStorage: createAction(
    'app/auth/setFbIdentityStorage',
    (payload: IFbAuthResponse) => ({ payload }) 
  ),
  setAuthenticationStatus: createAction(
    'app/auth/setAuthenticationStatus',
    (payload: boolean) => ({ payload })),
  setRefreshTokenResult: createAction(
    'app/auth/setRefreshTokenResult',
    (payload: API.RefreshLoginResponse) => ({ payload })),
  postLogout: createAction(
    'app/auth/postLogout'
  ),
  setUserProfile: createAction(
    'app/auth/setUserProfile',
    (payload: API.LoginResponseData | null) => ({ payload })),
  setToken: createAction(
    'app/auth/setToken',
    (payload: API.LoginResponseToken) => ({ payload })
  ),
};