import { createReducer } from '@reduxjs/toolkit';
import { PageModelResponse } from '../../utils/interfaces';
import { searchAction } from '../actions/searchAction';


export interface ISearchState {
  query?: string;
  users: PageModelResponse<API.SimpleUserProfile>;
}

const initial: ISearchState = {
  users: {
    items: [],
    pageIndex: 0,
    pageSize: 0,
    totalCount: 0
  }
};

export const searchReducer = createReducer(initial, build => {
  build
    .addCase(searchAction.setSearchResultsStorage, (state, action) => {
      if (action.payload.users) {
        const { users } = action.payload;
        state.users.items = [...state.users.items, ...users.items];
        state.users.pageIndex = users.pageIndex || 1;
        state.users.pageSize = users.pageSize || 0;
        state.users.totalCount = users.totalCount || 0;
        return state;
      }
    })
    .addCase(searchAction.setQueryStorage, (state, action) => {
      state.query = action.payload;
      return state;
    })
});