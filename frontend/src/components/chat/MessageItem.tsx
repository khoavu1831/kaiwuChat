import React, { useState } from 'react';
import { Message } from '../../types/message';
import { useAuthStore } from '../../stores/useAuthStore';

type MessageItemProps = {
  message: Message;
};


function MessageItem({ message }: MessageItemProps) {
  const { user } = useAuthStore();
  const isOwn = user?.id === message.senderId;
  const [open, setOpen] = useState<boolean>(false);

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
        ${isOwn ? "justify-end" : ""}
        flex gap-2
      `}
    >
      <div className={`
          ${isOwn ? "items-end" : "items-start"}
          flex flex-col max-w-1/2
        `}
      >
        <div className="flex gap-2 items-center">
          {/* avatar */}
          <div
            className={`
              ${isOwn ? "hidden" : ""}
              cover-avatar rounded-full overflow-hidden 
              shrink-0 h-6 w-6
            `}
          >
            <img
              className='h-full w-full object-cover'
              src="avatar-skeleton.jpeg"
              alt="avatar-in-chat"
            />
          </div>

          {/* message content */}
          <div
            className="flex flex-col w-full"
            onClick={() => setOpen(!open)}
          >
            <div
              className={`
                message bg-basecolor py-2 px-3 rounded-2xl
                ${isOwn ? 'bg-brandcolor/40' : 'bg-basecolor'}
              `}
            >
              <p className='text-[13px] text-white wrap-break-word'>
                {message.content}
              </p>
            </div>
          </div>
        </div>

        {/* created at */}
        <span className='text-[10px] text-[#666880] mt-1 pl-10'>
          {open && (formatTime(message.createdAt))}
        </span>
      </div>
    </div>
  )
}

export default MessageItem
