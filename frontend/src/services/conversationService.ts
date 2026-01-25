import api from "../libs/axios";
import {
  CreateConversationRequest,
  ConversationResponse,
  ConversationsResponse,
  AddMemberRequest
} from "../types/conversation";

export const conversationService = {
  // Tạo conversation mới (private hoặc group)
  createConversation: async (
    type: "private" | "group",
    toUserId?: number,
    name?: string
  ) => {
    const payload: CreateConversationRequest = {
      type,
      toUserId,
      name
    };

    const res = await api.post<{ data: any }>(
      '/conversation/',
      payload,
      { withCredentials: true }
    );

    // Backend returns { data: conversation }, not { conversation }
    return res.data.data;
  },

  // Lấy danh sách tất cả conversations của user
  getConversations: async () => {
    const res = await api.get<{ data: any[] }>(
      '/conversation/',
      { withCredentials: true }
    );

    // Backend returns { data: [...] }, not { conversations: [...] }
    return res.data?.data || [];
  },

  // Thêm thành viên vào group
  addMemberToGroup: async (conversationId: number, memberId: number) => {
    const payload: AddMemberRequest = {
      memberId
    };

    const res = await api.post(
      `/conversation/${conversationId}/member`,
      payload,
      { withCredentials: true }
    );

    return res.data;
  }
};
