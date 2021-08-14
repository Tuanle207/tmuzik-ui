import * as signalR from '@microsoft/signalr';
import ENV from '../env';
import logger from '../logger';

export interface IWebSocket {
  on(eventName: string, fn: (...args: any[]) => void): void;
  emit(eventName: string, ...args: any[]): void;
  connect(): void;
  disconnect(): void;
}  

export enum SocketState {
  Connected = 'connected',
  Disconnected = 'disconnected',
}

class WebSocket implements IWebSocket {
  private hubConnection?: signalR.HubConnection;
  private _state: SocketState;
  constructor() {
    this._state = SocketState.Disconnected;
  }

  connect() {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(`${ENV.apiUrl}/chatHub`)
    .build();
    this.hubConnection.onclose(() => {
      this._state = SocketState.Disconnected;
    })
    this._state = SocketState.Connected;
    logger.info('Websocket connected!');
  }

  get state(): SocketState {
    return this._state;
  }

  on(eventName: string, fn: (...args: any[]) => void) {
    if (this.hubConnection) {
      this.hubConnection.on(eventName, fn);
    } else {
      this.throwError();
    }
  }

  emit(eventName: string, ...args: any[]) {
    if (this.hubConnection) {
      this.hubConnection.invoke(eventName, ...args);
    } else {
      this.throwError();
    }
  }

  disconnect() {
    try {
      if (this.hubConnection) {
        this.hubConnection.stop();
        this._state = SocketState.Disconnected;
      } else {
        this.throwError();
      }
    } catch (e: any) {
      logger.error(e);
    }
    
  }

  private throwError() {
    throw Error('Websocket hasn\'t been connected!');
  }
}

const socket = new WebSocket();

export default socket;