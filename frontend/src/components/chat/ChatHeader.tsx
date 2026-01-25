import React from 'react';
import { useConversationStore } from '../../stores/useConversationStore';
import { useAuthStore } from '../../stores/useAuthStore';

function ChatHeader() {
  const { conversations, selectedConversationId } = useConversationStore();
  const { user } = useAuthStore();

  const currentConversation = conversations.find(c => c.id === selectedConversationId);

  if (!currentConversation) {
    return (
      <div className='flex items-center justify-between px-4 h-18 bg-basecolor/90 border-[#666880]/80'>
        <div className="left-section flex">
          <div className="flex flex-col">
            <h2 className='text-white'>Chọn một cuộc trò chuyện</h2>
          </div>
        </div>
      </div>
    );
  }

  // Lấy tên hiển thị
  const getDisplayName = () => {
    if (currentConversation.type === 'group') {
      return currentConversation.name || 'Nhóm';
    }

    const otherMember = currentConversation.participants?.find(m => m.userId !== user?.id);
    return otherMember?.user?.displayName || otherMember?.user?.username || 'Unknown';
  };

  // Lấy số lượng thành viên (cho group)
  const getMemberCount = () => {
    if (currentConversation.type === 'group') {
      return `${currentConversation.participants?.length || 0} thành viên`;
    }
    return 'Online'; // TODO: Implement real online status
  };

  return (
    <div className='flex items-center justify-between px-4 h-18 bg-basecolor/90 border-[#666880]/80'>
      {/* left section */}
      <div className="left-section flex items-center">
        {/* avatar */}
        <div className="cover-avatar w-12 h-12 relative">
          <img
            className="h-full w-full object-cover rounded-full"
            src="avatar-skeleton.jpeg"
            alt="avatar user"
          />
          {currentConversation.type === 'group' && (
            <div className="absolute -bottom-1 -right-1 bg-brandcolor rounded-full p-1">
              <i className="fa-solid fa-users text-white text-[8px]"></i>
            </div>
          )}
        </div>

        {/* info */}
        <div className="flex flex-col ml-4">
          {/* name user */}
          <h2 className='text-white font-medium'>{getDisplayName()}</h2>

          {/* state */}
          <span className='text-green-600 text-sm'>{getMemberCount()}</span>
        </div>
      </div>

      {/* right section */}
      <div className="right-section flex gap-4 text-white">
        {currentConversation.type === 'group' && (
          <i className="fa-solid fa-user-plus cursor-pointer hover:text-brandcolor transition-colors" title="Thêm thành viên"></i>
        )}
        <i className="fa-solid fa-ellipsis-vertical cursor-pointer hover:text-brandcolor transition-colors"></i>
      </div>
    </div>
  )
}

export default ChatHeader
