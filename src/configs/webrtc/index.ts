export {}
// import socket from '../websocket';
// import { EventEmitter } from 'eventemitter3'
// import RTCNegotiator from './Negotiator';
// import RTCPeer from './Peer';
// import { RTCConnectionEvent, RTCSocketEvent } from './utils';
// import logger from '../logger';

// const configs: RTCConfiguration = {
//   iceServers: [
//     {
//       urls: 'stun:stun.l.google.com:19302'
//     }
//   ],
// };

// export interface RTCConnectionOptions {
//   stream?: MediaStream;
//   peerId: string;
//   peer: RTCPeer;
// }

// export class RTCConnection extends EventEmitter {

//   private _provider: RTCPeer;
//   private _negotiator: RTCNegotiator | null;
//   private _peerConnection: RTCPeerConnection | null;
//   private _peerId: string;
//   private _localStream: MediaStream | null = null;
//   private _remoteStream: MediaStream | null = null;
//   private _open: boolean = false;

//   get provider(): RTCPeer {
//     return this._provider;
//   }

//   get peerConnection(): RTCPeerConnection | null {
//     return this._peerConnection;
//   }
  
//   set peerConnection(peerConnection: RTCPeerConnection | null) {
//     this._peerConnection = peerConnection;
//   }

//   get peerId(): string {
//     return this._peerId;
//   }

//   get localStream(): MediaStream | null {
//     return this._localStream;
//   }

  
//   constructor(options: RTCConnectionOptions) {
//     super();
//     this._provider = options.peer;
//     this._negotiator = new RTCNegotiator(this);
//     this._peerConnection = new RTCPeerConnection(configs);
//     this._peerId = options.peerId;
//     this._localStream = options.stream;

//     this._negotiator.startConnection({
//       _stream: this._localStream
//     });
//   }

//   addRemoteStream(remoteStream: MediaStream) {
//     logger.info('Receiving remote stream', remoteStream);
//     this._remoteStream = remoteStream;
//     super.emit(RTCConnectionEvent.Stream, remoteStream);
//   }

//   handleMessage(message: string, payload: ServerMessage): void {
//     if (this._negotiator === null) {
//       return;
//     }
//     switch (message) {
//       case RTCSocketEvent.ReceiveOffer:
//         // Forward to negotiator
//         this._negotiator.handleRemoteSDP(type, payload.candidate);
//         this._open = true;
//         break;
//       case RTCSocketEvent.ReceiveAnswer:
//         // Forward to negotiator
//         this._negotiator.handleRemoteSDP(type, payload.candidate);
//         this._open = true;
//         break;
//       case RTCSocketEvent.ReceiveCandidate:
//         this._negotiator.handleCandidate(payload.candidate);
//         break;
//       default:
//         break;
//     }
//   }

//   answer(stream: MediaStream, options: any = {}): void {
//     if (this._localStream) {
//       logger.warn(
//         "Local stream already exists on this MediaConnection. Are you answering a call twice?"
//       );
//       return;
//     }
//     if (this._negotiator === null) {
//       return;
//     }
//     this._localStream = stream;

//     this._negotiator.startConnection({ ...options, stream: stream });
//     // Retrieve lost messages stored because PeerConnection not set up.
//     const messages = this.provider._getMessages(this.connectionId);

//     for (let message of messages) {
//       this.handleMessage(message);
//     }

//     this._open = true;
//   }

//   close(): void {
//     if (this._negotiator) {
//       this._negotiator.cleanup();
//       this._negotiator = null;
//     }

//     this._localStream = null;
//     this._remoteStream = null;

//     if (this.provider) {
//       this.provider._removeConnection(this);

//       this.provider = null;
//     }

//     if (this.options && this.options._stream) {
//       this.options._stream = null;
//     }

//     if (!this.open) {
//       return;
//     }

//     this._open = false;

//     super.emit(RTCConnectionEvent.Close);
//   }
// }