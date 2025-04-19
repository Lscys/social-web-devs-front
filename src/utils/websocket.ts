// src/utils/websocket.ts
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

type LikeResponse = {
  postId: number;
  userId: number;
  totalLikes: number;
  action: 'like' | 'unlike';
};

let stompClient: Client;
let connected = false;
let listeners: ((like: LikeResponse) => void)[] = [];

export const connectWebSocket = () => {
  if (connected) return;

  const socket = new SockJS('http://localhost:8080/ws');

  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    onConnect: () => {
      console.log('[WS] Conectado');
      connected = true;

      stompClient.subscribe('/topic/post-likes', (message: IMessage) => {
        const like: LikeResponse = JSON.parse(message.body);
        console.log('[WS] Mensaje recibido:', like);
        listeners.forEach((cb) => cb(like));
      });
    },
    onWebSocketError: (e) => {
      console.error('[WS] WebSocket error', e);
    },
    onStompError: (frame) => {
      console.error('[STOMP] Error', frame);
    },
    onWebSocketClose: () => {
      console.warn('[WS] Desconectado');
      connected = false;
    },
    debug: (str) => {
      console.log('[STOMP DEBUG]', str);
    },
  });

  stompClient.activate();
};

export const sendLike = (postId: number, userId: number, action: 'like' | 'unlike') => {
  if (stompClient && connected) {
    console.log('[WS] Enviando like...');
    stompClient.publish({
      destination: '/app/like',
      body: JSON.stringify({ postId, userId, action }),
    });
  } else {
    console.warn('[WS] Cliente STOMP no conectado');
  }
};

export const onLikeUpdate = (callback: (like: LikeResponse) => void) => {
  listeners.push(callback);
};
