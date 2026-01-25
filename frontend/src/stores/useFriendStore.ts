import { create } from 'zustand';
import { FriendStore } from '../types/store';
import { friendService } from '../services/friendService';
import { userService } from '../services/userService';

export const useFriendStore = create<FriendStore>((set, get) => ({
  friends: [],
  friendRequests: [],
  loading: false,
  sendingRequest: false,
  searchResults: [],
  searching: false,

  // Tải danh sách bạn bè
  loadFriends: async () => {
    set({ loading: true });
    try {
      const friends = await friendService.getAllFriends();
      set({
        friends: friends || [],
        loading: false
      });
    } catch (error) {
      console.error('Error loading friends:', error);
      set({
        friends: [],
        loading: false
      });
    }
  },

  // Tải danh sách lời mời kết bạn
  loadFriendRequests: async () => {
    set({ loading: true });
    try {
      const friendRequests = await friendService.getFriendRequests();
      set({
        friendRequests: friendRequests || [],
        loading: false
      });
    } catch (error) {
      console.error('Error loading friend requests:', error);
      set({
        friendRequests: [],
        loading: false
      });
    }
  },

  // Gửi lời mời kết bạn
  sendFriendRequest: async (toUserId: number) => {
    set({ sendingRequest: true });
    try {
      await friendService.sendFriendRequest(toUserId);
      set({ sendingRequest: false });

      // Reload friend requests để cập nhật danh sách
      await get().loadFriendRequests();
    } catch (error) {
      console.error('Error sending friend request:', error);
      set({ sendingRequest: false });
      throw error;
    }
  },

  // Chấp nhận lời mời kết bạn
  acceptFriendRequest: async (requestId: number) => {
    try {
      await friendService.acceptFriendRequest(requestId);

      // Reload cả friends và friend requests
      await Promise.all([
        get().loadFriends(),
        get().loadFriendRequests()
      ]);
    } catch (error) {
      console.error('Error accepting friend request:', error);
      throw error;
    }
  },

  // Từ chối lời mời kết bạn
  declineFriendRequest: async (requestId: number) => {
    try {
      await friendService.declineFriendRequest(requestId);

      // Reload friend requests để cập nhật danh sách
      await get().loadFriendRequests();
    } catch (error) {
      console.error('Error declining friend request:', error);
      throw error;
    }
  },

  // Tìm kiếm người dùng
  searchUsers: async (query: string) => {
    set({ searching: true });
    try {
      const users = await userService.searchUsers(query);
      set({
        searchResults: users,
        searching: false
      });
    } catch (error) {
      console.error('Error searching users:', error);
      set({
        searchResults: [],
        searching: false
      });
      throw error;
    }
  },

  // Xóa kết quả tìm kiếm
  clearSearchResults: () => {
    set({ searchResults: [] });
  }
}));

