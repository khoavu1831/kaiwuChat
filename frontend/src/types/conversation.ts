import { User } from "./user";
import { Message } from "./message";

export interface ConversationMember {
  userId: number;
  user?: User;
  joinedAt: string;
}

export interface Conversation {
  id: number;
  _id?: number; // Deprecated, use id instead
  type: "private" | "group";
  name?: string;
  participants: ConversationMember[];
  lastMessage?: Message;
  unreadCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateConversationRequest {
  type: "private" | "group";
  toUserId?: number;
  name?: string;
}

export interface ConversationResponse {
  conversation: Conversation;
}

export interface ConversationsResponse {
  conversations: Conversation[];
}

export interface AddMemberRequest {
  memberId: number;
}
