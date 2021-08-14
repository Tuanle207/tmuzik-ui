import { AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { all, call, CallEffect, put, PutEffect, takeLatest } from 'redux-saga/effects';
import { ApiRequest, ApiResponse } from '../../api/interfaces';
import { authApi } from '../../api/requests';
import { FbAuthStatus, fbHandler, IFbAuthResponse, IFbUserInfoResponse } from '../../configs/fb';
import logger from '../../configs/logger';
import { authAction } from '../actions';


function* postLogin(action: PayloadAction<ApiRequest.Login>) : Generator<
  CallEffect<ApiResponse.Login> | PutEffect<AnyAction>,
  void,
  ApiResponse.Login
> {
  try {
    const { payload } = action;
    const result = yield call(authApi.postLogin, payload);
    logger.info('auth generator');
    logger.info(result);

    yield put(authAction.setLoginStorage(result));
  } catch (err) {
    logger.error(err);
    // put(authAction.setLoginStorage({}));
    // error handling
  }
}

function* postFbLogin() : Generator<
  CallEffect<IFbAuthResponse> | PutEffect<AnyAction> | CallEffect<IFbUserInfoResponse>,
  void,
  any
> {
  try {
    logger.info('login with fb...');
    const identity: IFbAuthResponse = yield call(fbHandler.loginAsync);
    
    if (identity.status === FbAuthStatus.Connected) {
      yield put(authAction.setFbIdentityStorage(identity));

      const { authResponse: { accessToken, userID } } = identity;
      const userData: IFbUserInfoResponse = yield call(fbHandler.getUserProfileAsync, { 
        accessToken, 
        userId: userID 
      });

      yield put(authAction.setFbUserProfile(userData))
    }
  } catch (err) {
    logger.error(err);
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(authAction.postLogin, postLogin),
    takeLatest(authAction.postFbLogin, postFbLogin)
  ]);
}