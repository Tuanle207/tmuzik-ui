import { createAction } from '@reduxjs/toolkit';
import { UILoadingPayload } from '../payloads/ui';

export const uiAction = {
  loadingUi: createAction( 
    'app/ui/loadingApp', 
    (payload: UILoadingPayload) => ({ payload }) 
  ),
};