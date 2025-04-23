import { nanoid } from 'nanoid';

// Chat service for managing websocket connection and chat history
export class ChatService {
  private ws: WebSocket | null = null;
  private messageListeners: ((message: any) => void)[] = [];
  private statusListeners: ((status: 'connecting' | 'connected' | 'disconnected' | 'error') => void)[] = [];
  private reconnectInterval: number = 3000;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private sessionId: string;

  constructor() {
    this.sessionId = localStorage.getItem('chat_session_id') || nanoid();
    localStorage.setItem('chat_session_id', this.sessionId);
  }

  // Connect to the WebSocket server
  connect() {
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      return;
    }

    try {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}`;
      
      console.log('Connecting to WebSocket at:', wsUrl);
      this.ws = new WebSocket(wsUrl);
      this.notifyStatusChange('connecting');

      this.ws.onopen = () => {
        this.reconnectAttempts = 0;
        this.notifyStatusChange('connected');
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.notifyMessageReceived(data);
        } catch (e) {
          console.error('Failed to parse message:', e);
        }
      };

      this.ws.onclose = () => {
        this.notifyStatusChange('disconnected');
        this.attemptReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.notifyStatusChange('error');
        this.ws?.close();
      };
    } catch (error) {
      console.error('Failed to establish WebSocket connection:', error);
      this.notifyStatusChange('error');
      this.attemptReconnect();
    }
  }

  // Send a message to the server
  sendMessage(message: string) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      this.connect();
      setTimeout(() => this.sendMessage(message), 1000);
      return;
    }

    const chatMessage = {
      sessionId: this.sessionId,
      message,
      isUser: true
    };

    this.ws.send(JSON.stringify(chatMessage));
    
    // Also notify listeners of the user message
    this.notifyMessageReceived({
      id: Date.now(),
      ...chatMessage,
      timestamp: new Date()
    });
  }

  // Disconnect from the server
  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  // Add a listener for new messages
  onMessage(callback: (message: any) => void) {
    this.messageListeners.push(callback);
    return () => {
      this.messageListeners = this.messageListeners.filter(cb => cb !== callback);
    };
  }

  // Add a listener for connection status changes
  onStatusChange(callback: (status: 'connecting' | 'connected' | 'disconnected' | 'error') => void) {
    this.statusListeners.push(callback);
    return () => {
      this.statusListeners = this.statusListeners.filter(cb => cb !== callback);
    };
  }

  // Notify all message listeners of a new message
  private notifyMessageReceived(message: any) {
    this.messageListeners.forEach(callback => callback(message));
  }

  // Notify all status listeners of a connection status change
  private notifyStatusChange(status: 'connecting' | 'connected' | 'disconnected' | 'error') {
    this.statusListeners.forEach(callback => callback(status));
  }

  // Attempt to reconnect after a connection failure
  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log('Max reconnect attempts reached');
      return;
    }

    this.reconnectAttempts++;
    setTimeout(() => {
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      this.connect();
    }, this.reconnectInterval);
  }

  // Get session ID
  getSessionId() {
    return this.sessionId;
  }
}

// Singleton instance for the app
export const chatService = new ChatService();
