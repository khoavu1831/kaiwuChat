export interface Message {
  id: number;
  _id?: number; // Deprecated, use id instead
  conversationId: number;
  senderId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface SendMessageRequest {
  conversationId: number;
  content: string;
}

export interface MessageResponse {
  message: Message;
}

export interface MessagesResponse {
  messages: Message[];
}
