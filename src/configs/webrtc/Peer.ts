export {}
// import { EventEmitter } from 'eventemitter3';
// import { RTCConnection } from '.';
// import { Util } from '../../utils/interfaces';
// import logger from '../logger';
// import socket, { IWebSocket } from '../websocket';
// import { IRTCSocketMessage, RTCPeerEvent, RTCSocketEvent } from './utils';

// export interface RTCPeerOptions {
//   id?: string;
// }

// class RTCPeer extends EventEmitter {
//   private readonly _configs: RTCConfiguration = {
//     iceServers: [
//       {
//         urls: 'stun:stun.l.google.com:19302'
//       }
//     ],
//   };
  
//   private readonly _socket: IWebSocket = socket;
//   private readonly _connections: Map<string, RTCConnection> = new Map<string, RTCConnection>();

//   private _id: string | null = null;
  
//   get id(): string | null {
//     return this._id;
//   }

//   get configs(): RTCConfiguration {
//     return this._configs;
//   }
  
//   get socket(): IWebSocket {
//     return this._socket;
//   }

//   get connections(): Util.IObject<RTCConnection> {
//     const plainConnections: Util.IObject<RTCConnection> = {};
//     for (const [k, v] of this._connections) {
//       plainConnections[k] = v;
//     }
//     return plainConnections;
//   }

//   constructor(options?: RTCPeerOptions) {
//     super();

//     if (options?.id) {
//       this._id = options.id;
//     } else {
//       // generate id
//     }
//   }

//   private _setupSocketListeners(): Socket {
//     const socket = this.socket;

//     socket.on(RTCSocketEvent.ReceiveOffer, (data: IRTCSocketMessage) => {
//       this._handleMessage(data);
//     });

//     socket.on(RTCSocketEvent.ReceiveAnswer, (data: IRTCSocketMessage) => {
//       this._handleMessage(data);
//     });

//     socket.on(RTCSocketEvent.ReceiveCandidate, (data: IRTCSocketMessage) => {
//       this._handleMessage(data);
//     });

//     socket.on(RTCSocketEvent.ReceiveReject, () => {
      
//     });

//     socket.on(RTCSocketEvent.ReceiveDisconnected, () => {
     
//     });

//     return socket;
//   }

//   private _handleMessage(message: IRTCSocketMessage): void {
//     const type = message.type;
//     const payload = message.payload;
//     const peerId = message.srcId;

//     switch (type) {
//       case RTCSocketEvent.ReceiveOffer:
//         this.emit(RTCPeerEvent.Open, this.id);
//         break;
//       case RTCSocketEvent.ReceiveAnswer: // Server error.
//         // this._abort(PeerErrorType.ServerError, payload.msg);
//         break;
//       case RTCSocketEvent.ReceiveReject: // The selected ID is taken.
//         // this._abort(PeerErrorType.UnavailableID, `ID "${this.id}" is taken`);
//         break;
//       case RTCSocketEvent.ReceiveCandidate: // The given API key cannot be found.
//         // this._abort(PeerErrorType.InvalidKey, `API KEY "${this._options.key}" is invalid`);
//         break;
//       case RTCSocketEvent.ReceiveDisconnected: // Another peer has closed its connection to this peer.
//         // logger.log(`Received leave message from ${peerId}`);
//         // this._cleanupPeer(peerId);
//         // this._connections.delete(peerId);
//         break;
//       case ServerMessageType.Offer: {
//         // we should consider switching this to CALL/CONNECT, but this is the least breaking option.
//         const connectionId = payload.connectionId;
//         let connection = this.getConnection(peerId, connectionId);

//         if (connection) {
//           connection.close();
//           logger.warn(`Offer received for existing Connection ID:${connectionId}`);
//         }

//         // Create a new connection.
//         connection = new RTCConnection({
//           peerId,
//           peer: this
//         });
//         this._addConnection(peerId, connection);
//         this.emit(RTCPeerEvent.Call, connection);

//         // Find messages.
//         const messages = this._getMessages(connectionId);
//         for (let message of messages) {
//           connection.handleMessage(message);
//         }

//         break;
//       }
//       default: {
       
//       }
//     }
//   }


//   call(peerId: string, stream: MediaStream) {

//     if (!stream) {
//       logger.error('To start a call, a stream must be provided!');
//       return;
//     }

//     const self = this;
//     const connection = new RTCConnection({
//       stream,
//       peerId,
//       peer: self,
//     });
//     this._addConnection(peerId, connection);
//     return connection;
//   }

//   private _addConnection(peerId: string, connection: RTCConnection) {
//     logger.info(`add connection to peerId:${peerId}`);

//     if (!this._connections.has(peerId)) {
//       this._connections.set(peerId, connection);
//     }
//   }

//   getConnection(peerId: string): RTCConnection | null {
//     const connection = this._connections.get(peerId);

//     if (!connection) {
//       return null;
//     }
//     return connection;
//   }
// }

// export default RTCPeer;