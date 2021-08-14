import { createAction } from '@reduxjs/toolkit';
import { ApiRequest, ApiResponse } from '../../api/interfaces';
import { IFbAuthResponse } from '../../configs/fb/IFbAuthResponse';
import { IFbUserInfoResponse } from '../../configs/fb/IFbUserInfoResponse';

export const authAction = {
  postLogin: createAction('app/auth/postLogin',
    (payload: ApiRequest.Login) => ({ payload })
  ),
  setLoginStorage: createAction('app/auth/setLoginStorage',
    (payload: ApiResponse.Login) => ({ payload })
  ),
  postFbLogin: createAction('app/auth/postFbLogin'),
  setFbIdentityStorage: createAction('app/auth/setFbIdentityStorage',
    (payload: IFbAuthResponse) => ({ payload }) 
  ),
  setFbUserProfile: createAction('app/auth/setFbUserProfile',
    (payload: IFbUserInfoResponse) => ({ payload }))
};