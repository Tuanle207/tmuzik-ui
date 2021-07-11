import { createAction } from '@reduxjs/toolkit';

export const UiAction = {
  loadingUi: createAction( 
    'app/loadingApp/loadingApp', 
    (payload: {
      type: string;
      loading: boolean;
    }) => ({payload}) 
  ),
};