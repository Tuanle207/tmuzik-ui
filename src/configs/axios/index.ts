import { HttpClient } from './HttpClient';
import ENV from '../env';
import { configHttpRequest, configHttpResponse } from './interceptors';

const httpClient = new HttpClient({
  baseUrl: ENV.apiUrl
});

httpClient.use(configHttpRequest);
httpClient.use(configHttpResponse);

export default httpClient;