import { HttpClient } from './HttpClient';
import ENV from '../env';
import { interceptHttpRequest, interceptHttpResponse } from './interceptors';

const httpClient = new HttpClient({
  baseUrl: ENV.apiUrl,
  options: {
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    }
  }
});

httpClient
  .use(interceptHttpRequest)
  .use(interceptHttpResponse);

export default httpClient;