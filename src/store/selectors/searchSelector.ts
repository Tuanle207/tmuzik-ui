import { createSelector } from 'reselect';
import { RootState } from '..';


export const searchSelector = {
  users: createSelector(
    (state: RootState) => state.search.users, 
    (users) => users
  ),
  usersTopResult: createSelector(
    (state: RootState) => state.search.users, 
    (users) => users.items.slice(0, 10)
  ),
}