export type UILoadingType = 
  | 'startingApp'
  | 'viewLoading'
  | 'success'
  | 'fail'
  ;

export interface UILoadingPayload {
  type: UILoadingType;
  loading: boolean;
}

export interface ViewLoadingPayload { 
  loading: boolean, 
  text?: string 
}

export interface LoadingResult {
  type: 'success' | 'fail';
  loading: boolean | null;
}