import { createSelector } from 'reselect';
import { RootState } from '..';


export const dashboardSelector = {
  users: createSelector(
    (state: RootState) => state.dashboard.users, 
    (users) => users
  ),
  usersTopResult: createSelector(
    (state: RootState) => state.dashboard.users, 
    (users) => users.items.slice(0, 10)
  ),
}