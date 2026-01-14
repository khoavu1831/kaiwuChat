import ChatInput from "./ChatInput"
import ChatWindow from "./ChatWindow"

function ChatLayout() {
  return (
    <div className='flex flex-col bg-brandcolor/40 w-full max-md:hidden'>ChatLayout
      <ChatWindow />
    </div>
  )
}

export default ChatLayout