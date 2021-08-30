export interface IPaginationModelState<T> {
  items: T[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  loading: boolean;
  error?: string
}

export interface IPaginationStatusPayload {
  loading: boolean;
  error?: string; 
}