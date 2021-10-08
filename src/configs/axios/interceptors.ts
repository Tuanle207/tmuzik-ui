import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { replace } from 'connected-react-router';
import { toast } from 'react-toastify';
import { routes } from '../../routings';
import { store } from '../../store';
import { authAction } from '../../store/actions';
import { isTokenExpired } from '../../utils/isTokenExpired';

export const interceptHttpRequest = (axios: AxiosInstance) => {
  axios.interceptors.request.use(async (config: AxiosRequestConfig) => {

    // Filter request that need access token
    const url = config.url || '';
    if ([
      '/api/auth/login',
      '/api/auth/loginWithFacebook',
      '/api/auth/signup',
      '/api/auth/refresh',
      '/api/auth/revoke'
    ].includes(url)) {
      return config;
    }

  
    const { auth: { token, expiryTime, refreshToken, userProfile } } = store.getState();
    const { id: userId } = userProfile || {};
    let newToken = token;
    
    // Get new token with refresh token if it's expired
    if (isTokenExpired(expiryTime) && userId && refreshToken && refreshToken.trim() !== '') {
      try {
        const reqBody: API.RefreshLoginRequest = {
          refreshToken,
          userId
        }
        const refreshTokenResult = await axios.post<API.RefreshLoginRequest,
          AxiosResponse<API.RefreshLoginResponse>>('/api/auth/refresh', reqBody);

        newToken = refreshTokenResult.data.accessToken;

        store.dispatch(authAction.setRefreshTokenResult(refreshTokenResult.data));
      } catch (err) {
        
      }
    }

    // Cancel request an redirect to login view
    if (isTokenExpired(expiryTime) && !refreshToken && refreshToken.trim() === '') {
      store.dispatch(replace(routes.Login));

      return {
        ...config,
        cancelToken: new Axios.CancelToken((cancel) => cancel('Cancel repeated request')),
      }
    }

    // Return header with additional Bearer token in header
    config.headers['Authorization'] = `Bearer ${newToken}`;
    return config;
  });
};

export const interceptHttpResponse = (axios: AxiosInstance) => {
  axios.interceptors.response.use((response: AxiosResponse) => {
      return response;
    },
    function(err: any) {
      if (err?.response?.status === 401) {

      } else if (err?.response?.status === 403) {
        toast.error('You have no right to access this page!');
        store.dispatch(replace(routes.Home));
      }
      console.log({err});
      const message = err?.response?.data?.detail || 'Unknown error has occurred!'
      throw new Error(message);
    }
  );
};