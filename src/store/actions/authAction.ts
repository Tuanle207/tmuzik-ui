import { createAction } from '@reduxjs/toolkit';
import { IFbAuthResponse } from '../../configs/fb/IFbAuthResponse';

export const authAction = {
  postLogin: createAction('app/auth/postLogin',
    (payload: ApiRequest.Login) => ({ payload })
  ),
  checkLogin: createAction('app/auth/checkLogin'),
  setLoginStorage: createAction('app/auth/setLoginStorage',
    (payload: ApiResponse.Login) => ({ payload })
  ),
  postFbLogin: createAction('app/auth/postFbLogin'),
  setFbIdentityStorage: createAction('app/auth/setFbIdentityStorage',
    (payload: IFbAuthResponse) => ({ payload }) 
  ),
  setAuthenticationStatus: createAction('app/auth/setAuthenticationStatus',
    (payload: boolean) => ({ payload })),
  setRefreshTokenResult: createAction('app/auth/setRefreshTokenResult',
    (payload: ApiResponse.RefreshLogin) => ({ payload })),
  postLogout: createAction('app/auth/postLogout'),
  setUserProfile: createAction('app/auth/setUserProfile',
    (payload: ApiResponse.LoginResponseData | null) => ({ payload })),
  setToken: createAction('app/auth/setToken',
    (payload: ApiResponse.LoginResponseToken) => ({ payload })),
};