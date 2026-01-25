import api from "../libs/axios";
import {
  SendMessageRequest,
  MessageResponse,
  MessagesResponse
} from "../types/message";

export const messageService = {
  // Gửi tin nhắn
  sendMessage: async (conversationId: number, content: string) => {
    const payload: SendMessageRequest = {
      conversationId,
      content
    };

    const res = await api.post<{ data: any }>('/message/', payload, {
      withCredentials: true
    });

    // Backend returns { data: message }, not { message }
    return res.data.data;
  },

  // Lấy danh sách tin nhắn của một conversation
  getMessages: async (conversationId: number) => {
    const res = await api.get<{ data: any[] }>(
      `/conversation/${conversationId}/message`,
      { withCredentials: true }
    );

    // Backend returns { data: [...] }, not { messages: [...] }
    return res.data?.data || [];
  },

  // Đánh dấu đã đọc (mark as seen)
  markAsSeen: async (conversationId: number) => {
    const res = await api.patch(
      `/conversation/${conversationId}/seen`,
      {},
      { withCredentials: true }
    );

    return res.data;
  }
};
