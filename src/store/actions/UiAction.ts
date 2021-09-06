import { createAction } from '@reduxjs/toolkit';
import { LoadingResult, UILoadingPayload, ViewLoadingPayload } from '../interface/ui';

export const uiAction = {
  loadingUi: createAction( 
    'app/ui/loadingUi', 
    (payload: UILoadingPayload) => ({ payload }) 
  ),
  viewLoading: createAction(
    'app/ui/viewLoading',
    (payload: ViewLoadingPayload) => ({payload})
  ),
  setLoadingResult: createAction(
    'app/ui/setLoadingResult',
    (payload: LoadingResult) => ({ payload })
  ),
  setDominantColor: createAction(
    'app/ui/setDominantColor',
    (payload: string | undefined) => ({ payload })
  )
};