import React from 'react';
import { FriendRequestWithUser } from '../../types/friend';
import { useFriendStore } from '../../stores/useFriendStore';

interface FriendRequestItemProps {
  request: FriendRequestWithUser;
}

function FriendRequestItem({ request }: FriendRequestItemProps) {
  const { acceptFriendRequest, declineFriendRequest } = useFriendStore();
  const [processing, setProcessing] = React.useState(false);

  const handleAccept = async () => {
    setProcessing(true);
    try {
      await acceptFriendRequest(request._id);
    } catch (error) {
      console.error('Failed to accept friend request:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleDecline = async () => {
    setProcessing(true);
    try {
      await declineFriendRequest(request._id);
    } catch (error) {
      console.error('Failed to decline friend request:', error);
    } finally {
      setProcessing(false);
    }
  };

  const sender = request?.fromUser;

  // Skip rendering if request is invalid
  if (!request) return null;

  return (
    <div className="flex items-center gap-3 p-3 bg-basecolor rounded-2xl mb-2">
      <div className="cover-avatar w-12 h-12">
        <img
          className="h-full w-full object-cover rounded-full"
          src={sender?.avatarUrl || "avatar-skeleton.jpeg"}
          alt={sender?.displayName || 'User'}
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-white font-medium truncate">
          {sender?.displayName || sender?.username || 'Unknown User'}
        </h3>
        <p className="text-[#666880] text-sm truncate">
          @{sender?.username || 'unknown'}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={handleAccept}
          disabled={processing}
          className="
            px-4 py-2 rounded-lg
            bg-brandcolor text-white text-[10px] font-medium
            hover:bg-brandcolor/80 transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {processing ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : (
            'Chấp nhận'
          )}
        </button>
        <button
          onClick={handleDecline}
          disabled={processing}
          className="
            px-4 py-2 rounded-lg
            bg-[#2c2e42] text-white text-[10px]
            hover:bg-[#3c3e52] transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          Từ chối
        </button>
      </div>
    </div>
  );
}

export default FriendRequestItem;
