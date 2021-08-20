import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

export const authSelectors = {
  isAuthenticated: createSelector(
    (state: RootState) => 
      state.auth.isAuthenticated, 
    (isAuthenticated) => 
      isAuthenticated
  ),
  userProfile: createSelector(
    (state: RootState) => 
      state.auth.userProfile, 
    (userProfile) => 
      userProfile
  ),
};