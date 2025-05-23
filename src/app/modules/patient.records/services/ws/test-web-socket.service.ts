import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
@Injectable({
  providedIn: 'root'
})
export class TestWebSocketService {
  private stompClient: Client;
  constructor() { 
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ppa-service/api/ws'),
      reconnectDelay: 5000,
      debug: str => console.log(str),
    });
  }
  connect(onData: (msg: string) => void): void {
    this.stompClient.onConnect = () => {
      this.stompClient.subscribe('/topic/data', (message: IMessage) => {
        onData(message.body);
      });
    };
    this.stompClient.activate();
  }
}
