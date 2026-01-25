import { create } from 'zustand';
import { MessageStore } from '../types/store';
import { messageService } from '../services/messageService';
import { Message } from '../types/message';

export const useMessageStore = create<MessageStore>((set, get) => ({
  messages: [],
  currentConversationId: null,
  loading: false,
  sending: false,

  // Tải tin nhắn từ API
  loadMessages: async (conversationId: number) => {
    set({ loading: true });
    try {
      const messages = await messageService.getMessages(conversationId);
      set({
        messages: messages || [],
        currentConversationId: conversationId,
        loading: false
      });
    } catch (error) {
      console.error('Error loading messages:', error);
      set({
        messages: [],
        loading: false
      });
    }
  },

  // Gửi tin nhắn mới
  sendMessage: async (content: string) => {
    const { currentConversationId } = get();

    if (!currentConversationId) {
      console.error('No conversation selected');
      return;
    }

    if (!content.trim()) {
      console.error('Message content is empty');
      return;
    }

    set({ sending: true });
    try {
      const message = await messageService.sendMessage(currentConversationId, content);

      // Thêm tin nhắn mới vào danh sách
      set((state) => ({
        messages: [...state.messages, message],
        sending: false
      }));
    } catch (error) {
      console.error('Error sending message:', error);
      set({ sending: false });
      throw error;
    }
  },

  // Thêm tin nhắn vào state (cho real-time)
  addMessage: (message: Message) => {
    set((state) => {
      // Kiểm tra xem tin nhắn đã tồn tại chưa
      const exists = state.messages.some(m => m.id === message.id);
      if (exists) return state;

      return {
        messages: [...state.messages, message]
      };
    });
  },

  // Đánh dấu đã đọc
  markAsSeen: async (conversationId: number) => {
    try {
      await messageService.markAsSeen(conversationId);
    } catch (error) {
      console.error('Error marking as seen:', error);
      throw error;
    }
  },

  // Xóa tin nhắn khi đổi conversation
  clearMessages: () => {
    set({
      messages: [],
      currentConversationId: null
    });
  }
}));
