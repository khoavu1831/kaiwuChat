import { User } from "./user";
import { Message } from "./message";
import { Conversation } from "./conversation";
import { FriendRequestWithUser } from "./friend";

export interface AuthState {
  accessToken: string | null;
  user: User | null;
  loading: boolean;

  setAccessToken: (accessToken: string) => void;

  clearState: () => void;

  signUp: (
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;

  signIn: (
    username: string,
    password: string,
  ) => Promise<void>;

  signOut: () => Promise<void>;
  fetchMe: () => Promise<void>;
  refresh: () => Promise<void>;
}

type TabType = "private" | "group" | "friend";

export interface UIStore {
  activeId: string | null;
  setActive: (id: string) => void;

  tab: TabType;
  setTab: (tab: TabType) => void;
}

export interface MessageStore {
  messages: Message[];
  currentConversationId: number | null;
  loading: boolean;
  sending: boolean;

  loadMessages: (conversationId: number) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  addMessage: (message: Message) => void;
  markAsSeen: (conversationId: number) => Promise<void>;
  clearMessages: () => void;
}

export interface ConversationStore {
  conversations: Conversation[];
  selectedConversationId: number | null;
  loading: boolean;
  creating: boolean;

  loadConversations: () => Promise<void>;
  createPrivateConversation: (toUserId: number) => Promise<void>;
  createGroupConversation: (name: string) => Promise<void>;
  selectConversation: (conversationId: number) => void;
  addMemberToGroup: (conversationId: number, memberId: number) => Promise<void>;
  updateConversation: (conversation: Conversation) => void;
}

export interface FriendStore {
  friends: User[];
  friendRequests: FriendRequestWithUser[];
  loading: boolean;
  sendingRequest: boolean;
  searchResults: User[];
  searching: boolean;

  loadFriends: () => Promise<void>;
  loadFriendRequests: () => Promise<void>;
  sendFriendRequest: (toUserId: number) => Promise<void>;
  acceptFriendRequest: (requestId: number) => Promise<void>;
  declineFriendRequest: (requestId: number) => Promise<void>;
  searchUsers: (query: string) => Promise<void>;
  clearSearchResults: () => void;
}