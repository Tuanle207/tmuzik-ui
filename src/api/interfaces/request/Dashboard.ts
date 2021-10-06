import { PageModelRequest } from '../../../utils/interfaces';

export interface GetSearchResultsRequest extends PageModelRequest {
  query: string;
  category: string;
}