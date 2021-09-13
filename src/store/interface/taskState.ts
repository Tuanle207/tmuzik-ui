
export type ITaskProcessState = 
  | 'processing' 
  | 'idle' 
  | 'success' 
  | 'error';

export interface ITaskStateItem {
  state: ITaskProcessState;
  error?: string;
}