import { createAction } from '@reduxjs/toolkit';

export const searchAction = {
  getSearchResults: createAction(
    'app/search/getSearchResults',
    (payload: API.GetSearchResultsRequest) =>  ({ payload })
  ),
  setSearchResultsStorage: createAction(
    'app/search/setSearchResultsStorage',
    (payload: API.GetSearchResultsResponse) => ({ payload })
  ),
  setQueryStorage: createAction(
    'app/search/setQueryStorage',
    (payload: string) => ({ payload })
  )
};