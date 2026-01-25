import React, { useEffect } from 'react';
import { useConversationStore } from '../../stores/useConversationStore';
import { useFriendStore } from '../../stores/useFriendStore';

interface CreatePrivateChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CreatePrivateChatModal({ isOpen, onClose }: CreatePrivateChatModalProps) {
  const { createPrivateConversation, creating } = useConversationStore();
  const { friends, loading, loadFriends } = useFriendStore();

  useEffect(() => {
    if (isOpen) {
      loadFriends();
    }
  }, [isOpen]);

  const handleSelectFriend = async (friendId: number) => {
    try {
      await createPrivateConversation(friendId);
      onClose();
    } catch (error) {
      console.error('Failed to create private conversation:', error);
      // TODO: Show toast notification
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-basecolor rounded-2xl p-6 w-full max-w-md mx-4 max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl font-semibold">Bắt đầu trò chuyện</h2>
          <button
            onClick={onClose}
            className="text-[#666880] hover:text-white transition-colors"
          >
            <i className="fa-solid fa-times text-xl"></i>
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <i className="fa-solid fa-spinner fa-spin text-white text-2xl"></i>
          </div>
        ) : friends.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <i className="fa-solid fa-user-group text-[#666880] text-4xl mb-3"></i>
            <p className="text-[#666880]">Bạn chưa có bạn bè nào</p>
          </div>
        ) : (
          <div className="overflow-y-auto chat-scroll flex-1">
            {friends.map((friend) => {
              // Skip if friend is null or undefined
              if (!friend) return null;

              return (
                <div
                  key={friend.id}
                  onClick={() => handleSelectFriend(friend.id)}
                  className="
                    flex items-center gap-3 p-3 rounded-lg
                    hover:bg-brandcolor/20 cursor-pointer
                    transition-colors duration-200
                  "
                >
                  <div className="cover-avatar w-12 h-12">
                    <img
                      className="h-full w-full object-cover rounded-full"
                      src={friend.avatarUrl || "avatar-skeleton.jpeg"}
                      alt={friend?.displayName || 'User'}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium">
                      {friend?.displayName || friend?.username || 'Unknown User'}
                    </h3>
                    <p className="text-[#666880] text-sm">
                      @{friend?.username || 'unknown'}
                    </p>
                  </div>
                  {creating && (
                    <i className="fa-solid fa-spinner fa-spin text-brandcolor"></i>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatePrivateChatModal;
