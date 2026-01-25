import React, { useState, useEffect } from 'react';
import { useFriendStore } from '../../stores/useFriendStore';

interface AddFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddFriendModal({ isOpen, onClose }: AddFriendModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    sendFriendRequest,
    sendingRequest,
    searchResults,
    searching,
    searchUsers,
    clearSearchResults
  } = useFriendStore();

  // Clear search results when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      clearSearchResults();
    }
  }, [isOpen, clearSearchResults]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      await searchUsers(searchQuery);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleSendRequest = async (userId: number) => {
    try {
      await sendFriendRequest(userId);
      // Remove the user from search results after sending request
      clearSearchResults();
      setSearchQuery('');
    } catch (error) {
      console.error('Failed to send friend request:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-basecolor rounded-2xl p-6 w-full max-w-md mx-4 max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl font-semibold">Thêm bạn bè</h2>
          <button
            onClick={onClose}
            className="text-[#666880] hover:text-white transition-colors"
          >
            <i className="fa-solid fa-times text-xl"></i>
          </button>
        </div>

        {/* Search input */}
        <div className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Tìm kiếm theo username hoặc email..."
              className="
                flex-1 bg-[#2c2e42] rounded-lg p-3
                text-white outline-none
                focus:ring-2 focus:ring-brandcolor
              "
              autoFocus
            />
            <button
              onClick={handleSearch}
              disabled={!searchQuery.trim() || searching}
              className="
                px-4 py-3 rounded-lg
                bg-brandcolor text-white
                hover:bg-brandcolor/80 transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {searching ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                <i className="fa-solid fa-search"></i>
              )}
            </button>
          </div>
        </div>

        {/* Search results */}
        <div className="flex-1 overflow-y-auto chat-scroll">
          {searchResults.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <i className="fa-solid fa-user-plus text-[#666880] text-4xl mb-3"></i>
              <p className="text-[#666880] text-sm text-center">
                Tìm kiếm người dùng để thêm bạn bè
              </p>
              <p className="text-[#666880] text-xs mt-1 text-center">
                Nhập username hoặc email và nhấn Enter
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {searchResults.map((user) => {
                // Skip if user is null or undefined
                if (!user) return null;

                return (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 p-3 bg-basecolor/50 rounded-lg"
                  >
                    <div className="cover-avatar w-12 h-12">
                      <img
                        className="h-full w-full object-cover rounded-full"
                        src={user.avatarUrl || "avatar-skeleton.jpeg"}
                        alt={user?.displayName || 'User'}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate">
                        {user?.displayName || user?.username || 'Unknown User'}
                      </h3>
                      <p className="text-[#666880] text-sm truncate">
                        @{user?.username || 'unknown'}
                      </p>
                    </div>

                    <button
                      onClick={() => handleSendRequest(user.id)}
                      disabled={sendingRequest}
                      className="
                        px-4 py-2 rounded-lg
                        bg-brandcolor text-white text-sm font-medium
                        hover:bg-brandcolor/80 transition-colors
                        disabled:opacity-50 disabled:cursor-not-allowed
                      "
                    >
                      {sendingRequest ? (
                        <i className="fa-solid fa-spinner fa-spin"></i>
                      ) : (
                        'Kết bạn'
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddFriendModal;
