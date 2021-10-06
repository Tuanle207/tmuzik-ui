import { createAction } from '@reduxjs/toolkit';

export const dashboardAction = {
  getSearchResults: createAction(
    'app/dashboard/getSearchResults',
    (payload: API.GetSearchResultsRequest) =>  ({ payload })
  ),
  setSearchResultsStorage: createAction(
    'app/dashboard/setSearchResultsStorage',
    (payload: API.GetSearchResultsResponse) => ({ payload })
  )
};