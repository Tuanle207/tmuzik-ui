import { createReducer } from '@reduxjs/toolkit';
import { PageModelResponse } from '../../utils/interfaces';
import { dashboardAction } from '../actions/dashboardAction';


export interface IDashboardState {
  users: PageModelResponse<API.SimpleUserProfile>;
}

const initial: IDashboardState = {
  users: {
    items: [],
    pageIndex: 0,
    pageSize: 0,
    totalCount: 0
  }
};

export const dashboardReducer = createReducer(initial, build => {
  build
    .addCase(dashboardAction.setSearchResultsStorage, (state, action) => {
      if (action.payload.users) {
        const { users } = action.payload;
        state.users.items = [...state.users.items, ...users.items];
        state.users.pageIndex = users.pageIndex;
        state.users.pageSize = users.pageSize;
        state.users.totalCount = users.totalCount;
        return state;
      }
    })
});