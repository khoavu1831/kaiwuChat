import React, { useEffect } from 'react';
import { useFriendStore } from '../../stores/useFriendStore';
import { useConversationStore } from '../../stores/useConversationStore';
import FriendSkeleton from '../skeleton/FriendSkeleton';

function FriendList() {
  const { friends, loading, loadFriends } = useFriendStore();
  const { createPrivateConversation } = useConversationStore();

  useEffect(() => {
    loadFriends();
  }, []);

  const handleStartChat = async (friendId: number) => {
    try {
      await createPrivateConversation(friendId);
    } catch (error) {
      console.error('Failed to start chat:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <i className="fa-solid fa-spinner fa-spin text-white text-2xl"></i>
      </div>
    );
  }

  if (friends.length === 0) {
    return (
      // <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
      //   <i className="fa-solid fa-user-group text-[#666880] text-4xl mb-3"></i>
      //   <p className="text-[#666880] text-sm">Bạn chưa có bạn bè nào</p>
      //   <p className="text-[#666880] text-xs mt-1">Hãy thêm bạn bè để bắt đầu trò chuyện!</p>
      // </div>
      <div className='flex justify-center w-full bg-basecolor h-full'>
        <div className="">
          <FriendSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-2">
      {friends.map((friend) => {
        // Skip if friend is null or undefined
        if (!friend) return null;

        return (
          <div
            key={friend.id}
            onClick={() => handleStartChat(friend.id)}
            className="
              flex items-center gap-3 p-3 rounded-lg
              hover:bg-brandcolor/20 cursor-pointer
              transition-colors duration-200
            "
          >
            <div className="cover-avatar w-12 h-12 relative">
              <img
                className="h-full w-full object-cover rounded-full"
                src={friend.avatarUrl || "avatar-skeleton.jpeg"}
                alt={friend?.displayName || 'User'}
              />
              {/* Online indicator - TODO: implement real online status */}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-basecolor"></div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium truncate">
                {friend?.displayName || friend?.username || 'Unknown User'}
              </h3>
              <p className="text-[#666880] text-sm truncate">
                @{friend?.username || 'unknown'}
              </p>
            </div>

            <i className="fa-solid fa-comment text-brandcolor opacity-0 group-hover:opacity-100 transition-opacity"></i>
          </div>
        );
      })}
    </div>
  );
}

export default FriendList;
