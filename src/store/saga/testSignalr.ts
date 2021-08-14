import { all, takeLatest } from 'redux-saga/effects';
// import { connection } from '../../configs/websocket';
import { signalrAction } from '../actions';


function* testSignalr(action: {
  payload: {
    message: string;
  }
}) {
  console.log('invoking');
  // yield connection.invoke("SendOfferMessage", action.payload.message);
}

export default function* signalrSaga() {
  yield all([
    takeLatest(signalrAction.sendMessage, testSignalr),
  ]);
}