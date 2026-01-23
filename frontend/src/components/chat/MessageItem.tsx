import React from 'react'
type Message = {
  isOwn: boolean,
  message: string
};

function MessageItem({ isOwn, message } : Message) {
  return (
    <div
      className={`
        ${isOwn ? "justify-end" : "justify-start"}
        flex items-center gap-2
      `}
    >
      {/* avatar */}
      <div
        className={`
          ${isOwn ? "hidden" : ""}
          cover-avatar rounded-full overflow-hidden
        `}
      >
        <img
          className='h-6 w-6 object-cover'
          src="avatar.jpg"
          alt="avatar-in-chat"
        />
      </div>

      {/* message content */}
      <div className="message bg-basecolor py-2 px-3 rounded-2xl max-w-[40%]">
        <p className='text-[12px] text-white'>
          {message}
        </p>
      </div>
    </div>
  )
}

export default MessageItem