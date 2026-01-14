import Logout from "../components/auth/Logout"
import ChatLayout from "../components/chat/ChatLayout";
import Sidebar from "../components/sidebar/Sidebar";
import api from "../libs/axios";
import { useAuthStore } from "../stores/useAuthStore"

function ChatAppPage() {

  return (
    <div className="main-container bg-basecolor">
      <div className="main-wrapper flex">

        {/* sidebar section */}
        <Sidebar />

        {/* chat section */}
        <ChatLayout />
      </div>
    </div>
  )
}

export default ChatAppPage