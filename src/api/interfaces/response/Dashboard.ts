import { SimpleUserProfile } from '.';
import { PageModelResponse } from '../../../utils/interfaces';

export interface GetSearchResultsResponse {
  users?: PageModelResponse<SimpleUserProfile>;
}