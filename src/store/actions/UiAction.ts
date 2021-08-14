import { createAction } from '@reduxjs/toolkit';

export const uiAction = {
  loadingUi: createAction( 
    'app/ui/loadingApp', 
    (payload: {
      type: string;
      loading: boolean;
    }) => ({payload}) 
  ),
};