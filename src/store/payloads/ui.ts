export type UILoadingType = 
  | 'startingApp'
  | 'loading'
  ;

export interface UILoadingPayload {
  type: UILoadingType;
  loading: boolean;
}