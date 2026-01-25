import api from "../libs/axios";
import { User } from "../types/user";

export interface SearchUsersResponse {
  message: string;
  users: User[];
}

export const userService = {
  // Tìm kiếm người dùng theo username hoặc email
  searchUsers: async (query: string): Promise<User[]> => {
    const res = await api.get<SearchUsersResponse>(
      `/user/search?q=${encodeURIComponent(query)}`,
      { withCredentials: true }
    );

    return res.data.users || [];
  }
};
