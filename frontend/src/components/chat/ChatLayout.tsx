import ChatHeader from "./ChatHeader"
import ChatInput from "./ChatInput"
import ChatWindow from "./ChatWindow"

function ChatLayout() {
  return (
    <div className='flex flex-col justify-between bg-brandcolor/40 w-full max-md:hidden font-mono'>
      <ChatHeader />
      <ChatWindow />
      <ChatInput />
    </div>
  )
}

export default ChatLayout