import React from 'react'

function ChatInput() {
  return (
    <div className='flex items-center px-4 h-18 bg-basecolor'>
      {/* left section */}
      <div className="flex gap-2 justify-between text-white text-xl">
        <i className="fa-solid fa-bars-staggered cursor-pointer hover:text-brandcolor duration-300"></i>
        <i className="fa-solid fa-face-grin cursor-pointer hover:text-brandcolor duration-300"></i>
      </div>

      {/* input */}
      <div className="relative group w-full px-2">
        <input
          type="text"
          placeholder="Chat chit gì đi ní..."
          className="
            w-full bg-[#2c2e42] rounded-full p-3 pr-16
            text-white outline-none
          "
        />

        <i
          className="
            fa-solid fa-paper-plane
            absolute right-8 top-1/2 -translate-y-1/2
            text-white cursor-pointer
            opacity-0 pointer-events-none
            transition-opacity duration-500
            group-focus-within:opacity-100
            group-focus-within:pointer-events-auto
            group-focus-within:text-brandcolor
          "
        />
      </div>


      {/* right section */}
      <div className="flex text-xl text-white">
        <i className="fa-solid fa-microphone cursor-pointer hover:text-brandcolor duration-300"></i>
      </div>
    </div>
  )
}

export default ChatInput