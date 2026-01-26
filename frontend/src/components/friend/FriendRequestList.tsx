import React, { useEffect } from 'react';
import { useFriendStore } from '../../stores/useFriendStore';
import FriendRequestItem from './FriendRequestItem';

function FriendRequestList() {
  const { friendRequests, loading, loadFriendRequests } = useFriendStore();

  useEffect(() => {
    loadFriendRequests();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <i className="fa-solid fa-spinner fa-spin text-white text-2xl"></i>
      </div>
    );
  }

  if (friendRequests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
        <i className="fa-solid fa-user-plus text-[#666880] text-4xl mb-3"></i>
        <p className="text-[#666880] text-sm">Không có lời mời kết bạn nào</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-2">
      {/* <h3 className="text-white font-medium mb-3 px-2">
        Lời mời kết bạn ({friendRequests.length})
      </h3> */}
      {friendRequests.map((request) => (
        <FriendRequestItem key={request._id} request={request} />
      ))}
    </div>
  );
}

export default FriendRequestList;
