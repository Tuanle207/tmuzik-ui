export default class HttpException<T = any> {
  statusCode?: number;
  message?: string;
  data?: T;

  constructor(message?: string, statusCode?: number, data?: T) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}