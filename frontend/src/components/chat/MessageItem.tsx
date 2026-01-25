import React from 'react';
import { Message } from '../../types/message';
import { useAuthStore } from '../../stores/useAuthStore';

type MessageItemProps = {
  message: Message;
};

function MessageItem({ message }: MessageItemProps) {
  const { user } = useAuthStore();
  const isOwn = user?.id === message.senderId;

  // Format thời gian hiển thị
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return 'Vừa xong';
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    if (diffInDays < 7) return `${diffInDays} ngày trước`;

    return date.toLocaleDateString('vi-VN');
  };

  return (
    <div
      className={`
        ${isOwn ? "justify-end" : "justify-start"}
        flex items-end gap-2
      `}
    >
      {/* avatar */}
      <div
        className={`
          ${isOwn ? "hidden" : ""}
          cover-avatar rounded-full overflow-hidden flex-shrink-0
        `}
      >
        <img
          className='h-6 w-6 object-cover'
          src="avatar-skeleton.jpeg"
          alt="avatar-in-chat"
        />
      </div>

      {/* message content */}
      <div className="flex flex-col max-w-[60%]">
        <div
          className={`
            message bg-basecolor py-2 px-3 rounded-2xl
            ${isOwn ? 'bg-brandcolor/40' : 'bg-basecolor'}
          `}
        >
          <p className='text-[13px] text-white break-words'>
            {message.content}
          </p>
        </div>
        <span className='text-[10px] text-[#666880] mt-1 px-2'>
          {formatTime(message.createdAt)}
        </span>
      </div>
    </div>
  )
}

export default MessageItem
