export interface IObject<TValue = any> { [key: string]: TValue;}

export interface IAction<T = any> {
  type: string;
  payload?: T;
}

export interface IInputError {
  when: boolean;
  message: string;
}

export interface PageModelRequest {
  pageIndex?: number;
  pageSize?: number;
}

export interface PageModelResponse<T> {
  items: T[];
  pageIndex?: number;
  pageSize?: number;
  totalCount?: number;
}