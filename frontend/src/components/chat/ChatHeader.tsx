import React from 'react'

function ChatHeader() {
  return (
    <div className='flex items-center justify-between px-4 h-18 bg-basecolor border-l border-[#666880]/80'>
      {/* left section */}
      <div className="left-section flex">

        {/* avatar */}
        <div className="cover-avatar w-12 h-12">
          <img
            className="h-full w-full object-cover rounded-full"
            src="avatar.jpg"
            alt="avatar user"
          />
        </div>

        {/* info */}
        <div className="flex flex-col ml-4">
          {/* name user */}
          <h2 className='text-white'>Name Name</h2>

          {/* state */}
          <span className='text-green-600 text-sm'>Online</span>
        </div>
      </div>

      {/* right section */}
      <div className="right-section">
        <i className="fa-solid fa-ellipsis-vertical text-white cursor-pointer"></i>
      </div>
    </div>
  )
}

export default ChatHeader