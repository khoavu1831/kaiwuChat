import React from 'react'
import ChatInput from './ChatInput'
import MessageList from './MessageList'

function ChatWindow() {
  return (
    <div>ChatWindow
      <MessageList />
      <ChatInput />
    </div>
  )
}

export default ChatWindow