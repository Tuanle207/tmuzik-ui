
export type ITaskProcessState = 'processing' | 'idle' | 'error';

export interface ITaskStateItem {
  state: ITaskProcessState;
  error?: string;
}