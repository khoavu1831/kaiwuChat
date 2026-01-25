import { useEffect, useRef } from 'react';
import MessageItem from './MessageItem';
import { useMessageStore } from '../../stores/useMessageStore';
import { useConversationStore } from '../../stores/useConversationStore';

function ChatWindow() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, loading, loadMessages, markAsSeen, clearMessages } = useMessageStore();
  const { selectedConversationId, conversations } = useConversationStore();

  // Tự động scroll xuống tin nhắn mới nhất
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load messages khi conversationId thay đổi
  useEffect(() => {
    if (selectedConversationId) {
      loadMessages(selectedConversationId);
      markAsSeen(selectedConversationId);
    } else {
      clearMessages();
    }
  }, [selectedConversationId]);

  // Tìm conversation hiện tại để hiển thị thông tin
  const currentConversation = conversations.find(c => c.id === selectedConversationId);

  // Loading state
  if (loading) {
    return (
      <div className='flex-1 overflow-y-auto p-4 chat-scroll'>
        <div className='flex flex-col items-center justify-center h-full'>
          <i className="fa-solid fa-spinner fa-spin text-white text-3xl"></i>
          <span className='text-[#666880] mt-2'>Đang tải tin nhắn...</span>
        </div>
      </div>
    );
  }

  // Empty state - chưa chọn conversation
  if (!selectedConversationId) {
    return (
      <div className='flex-1 overflow-y-auto p-4 chat-scroll'>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="cover-avatar h-20 w-20 my-2 rounded-full overflow-hidden">
            <img
              className='h-full w-full object-cover'
              src="avatar-skeleton.jpeg"
              alt="avatar"
            />
          </div>
          <span className='text-white text-lg font-semibold'>Chào mừng!</span>
          <span className='text-[#666880]'>Chọn một cuộc trò chuyện để bắt đầu</span>
        </div>
      </div>
    );
  }

  // Empty state - conversation mới chưa có tin nhắn
  if (messages.length === 0) {
    return (
      <div className='flex-1 overflow-y-auto p-4 chat-scroll'>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="cover-avatar h-15 w-15 my-2 rounded-full overflow-hidden">
            <img
              className='h-full w-full object-cover'
              src="avatar-skeleton.jpeg"
              alt="avatar"
            />
          </div>
          <span className='text-white'>
            {currentConversation?.name || 'Cuộc trò chuyện mới'}
          </span>
          <span className='text-[#666880]'>Bắt đầu cuộc trò chuyện ngay nào!</span>
        </div>
      </div>
    );
  }

  // Hiển thị danh sách tin nhắn
  return (
    <div className='flex-1 overflow-y-auto p-4 chat-scroll'>
      <div className='flex flex-col gap-3'>
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default ChatWindow
