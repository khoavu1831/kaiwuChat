import React, { useState } from 'react';
import { useMessageStore } from '../../stores/useMessageStore';
import { useConversationStore } from '../../stores/useConversationStore';

function ChatInput() {
  const [inputValue, setInputValue] = useState('');
  const { sendMessage, sending } = useMessageStore();
  const { selectedConversationId } = useConversationStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim() || !selectedConversationId) return;

    try {
      await sendMessage(inputValue);
      setInputValue(''); // Reset input sau khi gửi thành công
    } catch (error) {
      console.error('Failed to send message:', error);
      // TODO: Show toast notification
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        flex items-center px-4 h-18 bg-basecolor
        ${!selectedConversationId && 'hidden'}
      `}
    >
      {/* left section */}
      <div className="flex gap-2 justify-between text-white text-xl">
        <i className="fa-solid fa-bars-staggered cursor-pointer hover:text-brandcolor duration-300"></i>
        <i className="fa-solid fa-face-grin cursor-pointer hover:text-brandcolor duration-300"></i>
      </div>

      {/* input */}
      <div className="relative group w-full px-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={selectedConversationId ? "Chat chit gì đi ní..." : "Chọn một cuộc trò chuyện..."}
          disabled={!selectedConversationId || sending}
          className="
            w-full bg-[#2c2e42] rounded-full p-3 pr-16
            text-white outline-none
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        />

        <button
          type="submit"
          disabled={!inputValue.trim() || !selectedConversationId || sending}
          className={`
            fa-solid ${sending ? 'fa-spinner fa-spin' : 'fa-paper-plane'}
            absolute right-8 top-1/2 -translate-y-1/2
            text-white cursor-pointer
            transition-opacity duration-500
            ${inputValue.trim() && selectedConversationId && !sending
              ? 'opacity-100 text-brandcolor'
              : 'opacity-0 pointer-events-none'}
          `}
        />
      </div>

      {/* right section */}
      <div className="flex text-xl text-white">
        <i className="fa-solid fa-microphone cursor-pointer hover:text-brandcolor duration-300"></i>
      </div>
    </form>
  )
}

export default ChatInput
