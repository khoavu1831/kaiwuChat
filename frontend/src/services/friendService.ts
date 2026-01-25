import api from "../libs/axios";
import {
  SendFriendRequestRequest,
  FriendRequestResponse,
  FriendRequestsResponse,
  FriendsResponse
} from "../types/friend";

export const friendService = {
  // Gửi lời mời kết bạn
  sendFriendRequest: async (toUserId: number) => {
    const payload: SendFriendRequestRequest = {
      toUserId
    };

    const res = await api.post<FriendRequestResponse>(
      '/friend/request',
      payload,
      { withCredentials: true }
    );

    return res.data.friendRequest;
  },

  // Chấp nhận lời mời kết bạn
  acceptFriendRequest: async (requestId: number) => {
    const res = await api.post(
      `/friend/request/${requestId}/accept`,
      {},
      { withCredentials: true }
    );

    return res.data;
  },

  // Từ chối lời mời kết bạn
  declineFriendRequest: async (requestId: number) => {
    const res = await api.post(
      `/friend/request/${requestId}/decline`,
      {},
      { withCredentials: true }
    );

    return res.data;
  },

  // Lấy danh sách bạn bè
  getAllFriends: async () => {
    const res = await api.get<FriendsResponse>(
      '/friend/',
      { withCredentials: true }
    );

    return res.data?.friends || [];
  },

  // Lấy danh sách lời mời kết bạn
  getFriendRequests: async () => {
    const res = await api.get<FriendRequestsResponse>(
      '/friend/requests',
      { withCredentials: true }
    );

    return res.data?.friendRequests || [];
  }
};
