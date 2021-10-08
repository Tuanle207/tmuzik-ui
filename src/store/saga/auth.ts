import { PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { SagaIterator } from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { store } from '..';
import { authApiService } from '../../api/services';
import { FbAuthStatus, fbHandler, IFbAuthResponse } from '../../configs/fb';
import { isTokenExpired } from '../../utils/isTokenExpired';
import { sleepAsync } from '../../utils/sleepAsync';
import { authAction, taskStateAction, uiAction } from '../actions';
import logger from '../../configs/logger';

function* postLogin(action: PayloadAction<API.LoginRequest>): SagaIterator {
  try {
    yield put(taskStateAction.login({state: 'processing'}));

    const { payload } = action;
    const result = yield call(authApiService.loginAsync, payload);

    yield put(authAction.setLoginStorage(result));
    yield put(taskStateAction.login({state: 'idle'}));
  } catch (err: any) {
    logger.error(err);
    yield put(taskStateAction.login({state: 'error'}));
    toast.error(err.message || 'Unknow error. Cannot login!');
  }
}

function* postFbLogin(): SagaIterator {
  try {
    
    const { auth: { fb } } = store.getState();
    const xyz = 'EAAqIMeKcZCmgBANqAv3D2ii91UPc1Cqy85gxPjgZAUMRS76gIdCGLrIJ5a8Wtsxx3gqrQEGiVUTrHp2RW1t38I7Ma3VVaUZCvpZA2TnDiZAmkoDZBT4YdSU27ZB6OyX929Qab2ZCipMrnhvyprm1jwSvJyFTODnMEYZCe2xPhJArraFN6e5MwQDdFzheZBOgvZA33ne8SuLt5FuUEB5kGEZBzkAF';

    if (fb || xyz) {
      // const { accessToken } = fb?.authResponse || {};

      const result: API.LoginResponse = yield call(authApiService.loginWithFbAsync, {
        fbAccessToken: xyz
      });

      yield put(authAction.setLoginStorage(result));
    } else {
      
      const identity: IFbAuthResponse = yield call(fbHandler.loginAsync);
      
      if (identity.status === FbAuthStatus.Connected) {
        yield put(authAction.setFbIdentityStorage(identity));
  
        const { accessToken } = identity?.authResponse || {};
  
        logger.info({accessToken});
        
        const result: API.LoginResponse = yield call(authApiService.loginWithFbAsync, {
          fbAccessToken: 'EAAqIMeKcZCmgBANqAv3D2ii91UPc1Cqy85gxPjgZAUMRS76gIdCGLrIJ5a8Wtsxx3gqrQEGiVUTrHp2RW1t38I7Ma3VVaUZCvpZA2TnDiZAmkoDZBT4YdSU27ZB6OyX929Qab2ZCipMrnhvyprm1jwSvJyFTODnMEYZCe2xPhJArraFN6e5MwQDdFzheZBOgvZA33ne8SuLt5FuUEB5kGEZBzkAF'
        });
  
        yield put(authAction.setLoginStorage(result));
      }
    }
  } catch (err: any) {
    logger.error(err);
    const res = err?.response?.data;
    if (res?.status === 401) {
      const identity: IFbAuthResponse = yield call(fbHandler.loginAsync);
      
      if (identity.status === FbAuthStatus.Connected) {
        yield put(authAction.setFbIdentityStorage(identity));
  
        const { authResponse: { accessToken } } = identity;
  
        logger.info({accessToken});
        
        const result: API.LoginResponse = yield call(authApiService.loginWithFbAsync, {
          fbAccessToken: accessToken
        });
  
        yield put(authAction.setLoginStorage(result));
      }
    }
  }
}

function* checkLogin(): SagaIterator {
  try {
    yield put(uiAction.loadingUi({
      loading: true,
      type: 'startingApp'
    }));

    const { auth } = store.getState();
    const { expiryTime, refreshToken } = auth;
    const { id: userId } = auth.userProfile || { };

    const valid = !isTokenExpired(expiryTime);

    if (valid) {

      yield put(authAction.setAuthenticationStatus(true));
      
      // get user profile 
    } else if (userId && refreshToken && refreshToken.trim() !== '') {
      const refreshTokenRes = yield call(authApiService.refreshLoginAsync, {
        refreshToken,
        userId
      });
      yield put(authAction.setRefreshTokenResult(refreshTokenRes));
    } else {
      yield put(authAction.setAuthenticationStatus(false));
    }
  } catch (err) {
    logger.error(err);
    yield put(authAction.setAuthenticationStatus(false));
  }
  finally {
    yield call(sleepAsync, 1000);
    yield put(uiAction.loadingUi({
      loading: false,
      type: 'startingApp'
    }));
  }
}

function* postLogout(): SagaIterator {
  try {

    yield put(authAction.setAuthenticationStatus(false));


    const { auth: { refreshToken, userProfile } } = store.getState();
    const { id: userId } = userProfile || {};
    yield put(authAction.setToken({
      accessToken: '',
      accessTokenExpiresAt: '',
      refreshToken: '',
    }));
    yield put(authAction.setUserProfile(null));

    yield call(authApiService.revokeLoginAsync, {
      refreshToken,
      userId
    } as API.RevokeLoginRequest);
  } catch (err) {
    logger.error(err);
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(authAction.postLogin, postLogin),
    takeLatest(authAction.postFbLogin, postFbLogin),
    takeLatest(authAction.checkLogin, checkLogin),
    takeLatest(authAction.postLogout, postLogout),
  ]);
}