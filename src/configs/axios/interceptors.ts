import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { store } from '../../store';
import { authAction } from '../../store/actions';
import { isTokenExpired } from '../../utils/isTokenExpired';

export const interceptHttpRequest = (axios: AxiosInstance) => {
  axios.interceptors.request.use(async (config: AxiosRequestConfig) => {

    // filter request
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
      
    try { // Get new token with refresh token if it's expired
      if (isTokenExpired(expiryTime) && userId && refreshToken && refreshToken.trim() !== '') {
        const reqBody: ApiRequest.RefreshLogin = {
          refreshToken,
          userId
        } 
        const refreshTokenResult = await axios.post<ApiRequest.RefreshLogin,
          AxiosResponse<ApiResponse.RefreshLogin>>('/api/auth/refresh', reqBody);

        newToken = refreshTokenResult.data.accessToken;

        store.dispatch(authAction.setRefreshTokenResult(refreshTokenResult.data));
      }
    } catch (err) {

    } finally {
      config.headers['Authorization'] = `Bearer ${newToken}`;
      return config;
    }
  });
};

export const interceptHttpResponse = (axios: AxiosInstance) => {
  axios.interceptors.response.use((response: AxiosResponse) => {
      if (response.status === 401) {
        console.log('Not authorized');
      } else if (response.status === 403) {
        console.log('Forbbiden');
      }
      return response;
    },
    // TODO: handle exception
    function(err: any) {
      if (err?.response?.status === 401) {
        console.log('Not authorized');
      } else if (err?.response?.status === 403) {
        console.log('Forbbiden');
      }
      console.log('error');
      console.log({err});
      return err;
    }
  );
};