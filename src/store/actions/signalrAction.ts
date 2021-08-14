import { createAction } from '@reduxjs/toolkit';

export const signalrAction = {
  sendMessage: createAction(
    'app/signalr/sendMessage',
    (payload: {
      message: string;
    }) => ({payload}),
  )
};