export enum RTCSocketEvent {
  SendOffer = 'SendOfferMessage',
  ReceiveOffer = 'ReceiveOfferMessage',
  SendAnswer = 'SendAnswerMessage',
  ReceiveAnswer = 'ReceiveAnswerMessage',
  SendReject = 'SendReject',
  ReceiveReject = 'ReceiveReject',
  SendCandidate = 'SendCandidateMessage',
  ReceiveCandidate = 'ReceiveCandidateMessage',
  SendDisconnected = 'SendDisconnectedMessage',
  ReceiveDisconnected = 'ReceiveDisconnectedMessage',
  SendCloseConnection = 'SendCloseConnectionMessage',
  ReceiveCloseConnection = 'ReceiveCloseConnectionMessage'
}

export enum RTCConnectionEvent {
  Open = 'open',
  Stream = 'stream',
  Close = 'close',
  Error = 'error',
  IceStateChanged = 'iceStateChanged'
}

export enum RTCPeerEvent {
  Open = 'open',
  Call = 'call',
}

export interface IRTCSocketMessage {
  type: RTCSocketEvent;
  srcId: string;
  remoteId: string;
  payload: RTCSessionDescription | RTCIceCandidate | null;
}