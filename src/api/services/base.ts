import httpClient from '../../configs/axios';
import { IObject } from '../../utils/interfaces';

abstract class BaseApiService {
  
  private readonly PREFIX: string;

  constructor(prefix: string = '') {
    this.PREFIX = prefix;
  }

  private path(subpath: string = ''): string {
    if (subpath.trim() === '') {
      return `/api/${this.PREFIX}`; 
    }
    return `/api/${this.PREFIX}/${subpath}`;
  }

  protected get<T>(routeTemplate: string, params: IObject = {}): Promise<T> {
    var endpoint = this.path(routeTemplate);
    return httpClient.get<T>(endpoint, params);
  }

  protected post<T>(routeTemplate: string, body: IObject = {}): Promise<T> {
    var endpoint = this.path(routeTemplate);
    return httpClient.post<T>(endpoint, body);
  }

  protected postFormData<T>(routeTemplate: string, body: IObject = {}): Promise<T> {
    var endpoint = this.path(routeTemplate);

    const formData = new FormData();
    Object.keys(body).forEach((key) => {
      if (Array.isArray(body[key])) {
        Array.from<File>(body[key]).forEach((el) => {
          formData.append(key, el);
        });
      } else {
        formData.append(key, body[key]);
      }
    });

    return httpClient.postFormData<T>(endpoint, formData);
  }

  protected put<T>(routeTemplate: string, body: IObject = {}): Promise<T> {
    var endpoint = this.path(routeTemplate);
    return httpClient.put<T>(endpoint, body);
  }

  protected patch<T>(routeTemplate: string, body: IObject = {}): Promise<T> {
    var endpoint = this.path(routeTemplate);
    return httpClient.patch<T>(endpoint, body);
  }

  protected delete(routeTemplate: string, body: IObject = {}): Promise<void> {
    var endpoint = this.path(routeTemplate);
    return httpClient.delete(endpoint, body);
  }

};

export default BaseApiService;