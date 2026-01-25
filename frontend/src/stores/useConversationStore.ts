import { create } from 'zustand';
import { ConversationStore } from '../types/store';
import { conversationService } from '../services/conversationService';
import { Conversation } from '../types/conversation';

export const useConversationStore = create<ConversationStore>((set, get) => ({
  conversations: [],
  selectedConversationId: null,
  loading: false,
  creating: false,

  // Tải danh sách conversations
  loadConversations: async () => {
    set({ loading: true });
    try {
      const conversations = await conversationService.getConversations();

      // Kiểm tra nếu conversations là undefined hoặc null
      if (!conversations || !Array.isArray(conversations)) {
        console.warn('No conversations returned from API');
        set({
          conversations: [],
          loading: false
        });
        return;
      }

      // Sắp xếp conversations theo thời gian last message (mới nhất lên đầu)
      const sortedConversations = conversations.sort((a, b) => {
        const timeA = a.lastMessage?.createdAt || a.createdAt;
        const timeB = b.lastMessage?.createdAt || b.createdAt;
        return new Date(timeB).getTime() - new Date(timeA).getTime();
      });

      set({
        conversations: sortedConversations,
        loading: false
      });
    } catch (error) {
      console.error('Error loading conversations:', error);
      set({
        conversations: [],
        loading: false
      });
      // Don't throw error, just set empty array
    }
  },

  // Tạo private chat
  createPrivateConversation: async (toUserId: number) => {
    set({ creating: true });
    try {
      // Kiểm tra xem đã có conversation với user này chưa
      const existingConversation = get().conversations.find(
        conv => conv.type === 'private' &&
          conv.participants?.some(m => m.userId === toUserId)
      );

      if (existingConversation) {
        // Nếu đã có, chỉ cần chọn conversation đó
        set({
          selectedConversationId: existingConversation.id,
          creating: false
        });
        return;
      }

      // Tạo conversation mới
      const conversation = await conversationService.createConversation(
        'private',
        toUserId
      );

      // Kiểm tra xem conversation đã tồn tại trong list chưa (backend có thể trả về conversation cũ)
      const alreadyExists = get().conversations.some(c => c.id === conversation.id);

      if (alreadyExists) {
        // Chỉ select, không thêm vào list
        set({
          selectedConversationId: conversation.id,
          creating: false
        });
        return;
      }

      set((state) => ({
        conversations: [conversation, ...state.conversations],
        selectedConversationId: conversation.id,
        creating: false
      }));
    } catch (error) {
      console.error('Error creating private conversation:', error);
      set({ creating: false });
      throw error;
    }
  },

  // Tạo group chat
  createGroupConversation: async (name: string) => {
    set({ creating: true });
    try {
      const conversation = await conversationService.createConversation(
        'group',
        undefined,
        name
      );

      set((state) => ({
        conversations: [conversation, ...state.conversations],
        selectedConversationId: conversation.id,
        creating: false
      }));
    } catch (error) {
      console.error('Error creating group conversation:', error);
      set({ creating: false });
      throw error;
    }
  },

  // Chọn conversation để chat
  selectConversation: (conversationId: number) => {
    set({ selectedConversationId: conversationId });
  },

  // Thêm thành viên vào group
  addMemberToGroup: async (conversationId: number, memberId: number) => {
    try {
      await conversationService.addMemberToGroup(conversationId, memberId);

      // Reload conversations để cập nhật danh sách members
      await get().loadConversations();
    } catch (error) {
      console.error('Error adding member to group:', error);
      throw error;
    }
  },

  // Cập nhật conversation (khi có tin nhắn mới)
  updateConversation: (conversation: Conversation) => {
    set((state) => {
      const index = state.conversations.findIndex(c => c.id === conversation.id);

      if (index === -1) {
        // Conversation mới, thêm vào đầu danh sách
        return {
          conversations: [conversation, ...state.conversations]
        };
      }

      // Cập nhật conversation và đưa lên đầu danh sách
      const updatedConversations = [...state.conversations];
      updatedConversations.splice(index, 1);
      updatedConversations.unshift(conversation);

      return {
        conversations: updatedConversations
      };
    });
  }
}));
