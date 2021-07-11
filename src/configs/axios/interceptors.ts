import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
// import { webStore as store } from '../../store';

export const configHttpRequest = (axios: AxiosInstance) => {
  // const token = store.store.getState().auth.token;
  axios.interceptors.request.use(function (config: AxiosRequestConfig) {
    config.headers['Authorization'] = `Bearer ${'12'}`;
    return config;
  });
};

export const configHttpResponse = (axios: AxiosInstance) => {
  axios.interceptors.response.use(
    function (response: AxiosResponse) {
      if (response.status === 401) {
        console.log('Not authorized');
      } else if (response.status === 403) {
        console.log('Forbbiden');
      }
      return response;
    },
    // TODO: handle exception
    function(err: any) {
      console.log('error');
    }
  );
};