import Axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError
} from 'axios';
import { IObject } from '../../utils/interfaces';
import HttpException from './HttpException';
import { parseQueryString } from './utils';

export class HttpClient {
  private instance: AxiosInstance;

  constructor({ baseUrl, options = {} }: {
    baseUrl: string;
    options?: AxiosRequestConfig;
  }) {
    this.instance = Axios.create({
      baseURL: baseUrl,
      ...options
    })
  }

  private createHttpException(error?: any): HttpException {
    if (!error) {
      return new HttpException('Unknown Error', 500);
    } else if (!error.isAxiosError) {
      if (error.message) {
        return new HttpException(error.message, 500);
      }
      return new HttpException('Unknown Error', 500);
    }

    const { response, message = 'Unknown Error' } = error as AxiosError;
    if (response) {
      const { data = {}, status = 500 } = response;
      return new HttpException(message, status, data);
    }
    return new HttpException(message, 500)
  }
  
  use(interceptorConfig: (axios: AxiosInstance) => void) {
    interceptorConfig(this.instance);
    return this;
  }

  async get<T>(endpoint: string, params: IObject = {}): Promise<T> {
    try {
      const queryString = parseQueryString(params);
      const reqEndpoint = `${endpoint}${queryString}`;
      const result = await this.instance.get(reqEndpoint);
      return result?.data;
    } catch (error) {
      throw this.createHttpException(error);
    }
  }

  async post<T>(endpoint: string, body: IObject = {}): Promise<T> {
    try {
      const result = await this.instance.post(endpoint, body);
      return result?.data;
    } catch (error) {
      throw this.createHttpException(error);
    }
  }

  async postFormData<T>(endpoint: string, body: FormData): Promise<T> {
    try {
      const headers = {
        'Content-Type': 'multipart/form-data',
      };

      const result = await this.instance.post(endpoint, body, {
        headers
      });
      return result?.data;
    } catch (error) {
      throw this.createHttpException(error);
    }
  }

  async put<T>(endpoint: string, body: IObject = {}): Promise<T> {
    try {
      const result = await this.instance.put(endpoint, body);
      return result?.data;
    } catch (error) {
      throw this.createHttpException(error);
    }
  }

  async patch<T>(endpoint: string, body: IObject = {}): Promise<T> {
    try {
      const result = await this.instance.patch(endpoint, body);
      return result?.data;
    } catch (error) {
      throw this.createHttpException(error);
    }
  }

  async delete(endpoint: string, body: IObject = {}): Promise<void> {
    try {
      await this.instance.delete(endpoint, {
        data: body
      });
    } catch (error) {
      throw this.createHttpException(error);
    }
  }
}
