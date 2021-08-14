export {}
// import { RTCConnection } from '.';
// import logger from '../logger';
// import { RTCConnectionEvent, RTCSocketEvent } from './utils';

// class RTCNegotiator {
  
//   constructor(readonly connection: RTCConnection) {}
  
//   startConnection(options: any) {
//     const peerConnection = this._startPeerConnection();

//     this.connection.peerConnection = peerConnection;

//     if (options.stream) {
//       this._addTracksToConnection(options.stream, peerConnection);
//     }

//     this.handleRemoteSDP("OFFER", options.sdp);

//   }

//   private _startPeerConnection(): RTCPeerConnection {
//     logger.info('Creating RTCPeerConnection.');

//     const peerConnection = new RTCPeerConnection(this.connection.provider.configs);

//     this._setupListeners(peerConnection);

//     return peerConnection;
//   }

//   private _setupListeners(peerConnection: RTCPeerConnection) {
//     const peerId = this.connection.provider.id; // ?
//     const connectionId = this.connection.provider.id; //?
//     const provider = this.connection.provider;

//     // ICE CANDIDATES.
//     logger.info('Listening for ICE candidates.');

//     peerConnection.onicecandidate = (evt) => {
//       if (!evt.candidate || !evt.candidate.candidate) return;

//       logger.info(`Received ICE candidates for ${peerId}:`, evt.candidate);

//       provider.socket.emit(RTCSocketEvent.SendCandidate, {
//         id: connectionId,
//         candidate: evt.candidate,
//       });
//     };

//     peerConnection.oniceconnectionstatechange = () => {
//       switch (peerConnection.iceConnectionState) {
//         case 'failed':
//           logger.info(
//             'iceConnectionState is failed, closing connections to ' +
//             peerId
//           );
//           this.connection.emit(
//             RTCConnectionEvent.Error,
//             new Error('Negotiation of connection to ' + peerId + ' failed.')
//           );
//           this.connection.close();
//           break;
//         case 'closed':
//           logger.info(
//             'iceConnectionState is closed, closing connections to ' +
//             peerId
//           );
//           this.connection.emit(
//             RTCConnectionEvent.Close,
//             new Error('Connection to ' + peerId + ' closed.')
//           );
//           this.connection.close();
//           break;
//         case 'disconnected':
//           logger.info(
//             'iceConnectionState changed to disconnected on the connection with ' +
//             peerId
//           );
//           break;
//         case 'completed':
//           peerConnection.onicecandidate = () => {};
//           break;
//       }

//       this.connection.emit(RTCConnectionEvent.IceStateChanged, peerConnection.iceConnectionState);
//     };


//     // Media stream.
//     logger.info('Listening for remote stream');
//     peerConnection.ontrack = (evt) => {
//       logger.info('Received remote stream');

//       const stream = evt.streams[0];
//       const connection = provider.getConnection(peerId || '');

//       if (connection) {
//         this._addStreamToConnection(stream, connection);
//       }
//     };
//   }

//   private async _makeOffer(): Promise<void> {
//     const peerConnection = this.connection.peerConnection;
//     const provider = this.connection.provider;
//     if (peerConnection === null)  {
//       return;
//     }

//     try {
//       const offer = await peerConnection.createOffer();

//       logger.info("Created offer.");

//       try {
//         await peerConnection.setLocalDescription(offer);

//         logger.info("Set localDescription:", offer, `for:${this.connection.peerId}`);

//         provider.socket.emit(RTCSocketEvent.SendOffer, { sdp: offer });
//       } catch (err) {
//         // TODO: investigate why _makeOffer is being called from the answer
//         if (err !== "OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer") {
//           // provider.emit(PeerErrorType.WebRTC, err);
//           logger.error("Failed to setLocalDescription, ", err);
//         }
//       }
//     } catch (err_1) {
//       // provider.emitError(PeerErrorType.WebRTC, err_1);
//       logger.error("Failed to createOffer, ", err_1);
//     }
//   }

//   private async _makeAnswer(): Promise<void> {
//     const peerConnection = this.connection.peerConnection;
//     const provider = this.connection.provider;
//     if (peerConnection === null)  {
//       return;
//     }

//     try {
//       const answer = await peerConnection.createAnswer();
//       logger.info("Created answer.");

//       try {
//         await peerConnection.setLocalDescription(answer);

//         logger.info(`Set localDescription:`, answer, `for:${this.connection.peerId}`);

//         provider.socket.emit(RTCSocketEvent.SendAnswer, {
//           sdp: answer,
//           connectionId: this.connection.peerId,
//         });
//       } catch (err) {
//         // provider.emitError(PeerErrorType.WebRTC, err);
//         logger.error("Failed to setLocalDescription, ", err);
//       }
//     } catch (err_1) {
//       // provider.emitError(PeerErrorType.WebRTC, err_1);
//       logger.error("Failed to create answer, ", err_1);
//     }
//   }

//   async handleRemoteSDP(
//     type: string,
//     sdp: any
//   ): Promise<void> {
//     sdp = new RTCSessionDescription(sdp);
//     const peerConnection = this.connection.peerConnection;
//     if (peerConnection === null)  {
//       return;
//     }
//     const provider = this.connection.provider;

//     logger.info("Setting remote description", sdp);

//     const self = this;

//     try {
//       await peerConnection.setRemoteDescription(sdp);
//       logger.info(`Set remoteDescription:${type} for:${this.connection.peerId}`);
//       if (type === "OFFER") {
//         await self._makeAnswer();
//       }
//     } catch (err) {
//       // provider.emitError(PeerErrorType.WebRTC, err);
//       logger.error("Failed to setRemoteDescription, ", err);
//     }
//   }

//   async handleCandidate(ice: RTCIceCandidate): Promise<void> {
//     logger.info(`handleCandidate:`, ice);
//     const peerConnection = this.connection.peerConnection;
//     if (peerConnection === null)  {
//       return;
//     }
//     const candidate = ice.candidate;
//     const sdpMLineIndex = ice.sdpMLineIndex;
//     const sdpMid = ice.sdpMid;
//     const provider = this.connection.provider;
    
//     try {
      
//       await peerConnection.addIceCandidate(
//         new RTCIceCandidate({
//           sdpMid: sdpMid,
//           sdpMLineIndex: sdpMLineIndex,
//           candidate: candidate
//         })
//       );
//       logger.info(`Added ICE candidate for:${this.connection.peerId}`);
//     } catch (err) {
//       // provider.emitError(PeerErrorType.WebRTC, err);
//       logger.info("Failed to handleCandidate, ", err);
//     }
//   }

//   private _addTracksToConnection(stream: MediaStream, peerConnection: RTCPeerConnection) {
//     logger.info(`add tracks from stream ${stream.id} to peer connection`);

//     if (!peerConnection.addTrack) {
//       return logger.error(
//         `Your browser does't support RTCPeerConnection#addTrack. Ignored.`
//       );
//     }

//     stream.getTracks().forEach(track => {
//       peerConnection.addTrack(track, stream);
//     });
//   }

//   private _addStreamToConnection(stream: MediaStream, connection: RTCConnection) {
//     logger.info(`add stream ${stream.id} to media connection ${connection.peerId}`);
//     connection.addRemoteStream(stream);
//   }

//   cleanup(): void {
//     logger.info("Cleaning up PeerConnection to " + this.connection.peerId);

//     const peerConnection = this.connection.peerConnection;

//     if (!peerConnection) {
//       return;
//     }

//     this.connection.peerConnection = null;

//     //unsubscribe from all PeerConnection's events
//     peerConnection.onicecandidate 
//       = peerConnection.oniceconnectionstatechange 
//       = peerConnection.ondatachannel 
//       = peerConnection.ontrack 
//       = () => { };

//     const peerConnectionNotClosed = peerConnection.signalingState !== "closed";

//     if (peerConnectionNotClosed) {
//       peerConnection.close();
//     }
//   }
// } 

// export default RTCNegotiator;