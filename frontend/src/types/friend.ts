import { User } from "./user";

export type FriendshipStatus = "pending" | "accepted" | "declined";

export interface FriendRequest {
  _id: number;
  fromUserId: number;
  toUserId: number;
  status: FriendshipStatus;
  createdAt: string;
  updatedAt: string;
}

export interface FriendRequestWithUser extends FriendRequest {
  fromUser?: User;
  toUser?: User;
}

export interface SendFriendRequestRequest {
  toUserId: number;
}

export interface FriendRequestResponse {
  friendRequest: FriendRequest;
}

export interface FriendRequestsResponse {
  friendRequests: FriendRequestWithUser[];
}

export interface FriendsResponse {
  friends: User[];
}
