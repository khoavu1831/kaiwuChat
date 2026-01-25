import { useConversationStore } from "../../stores/useConversationStore";
import { Conversation as ConversationType } from "../../types/conversation";
import { useAuthStore } from "../../stores/useAuthStore";

interface ConversationProps {
  conversation: ConversationType;
}

function Conversation({ conversation }: ConversationProps) {
  const { selectedConversationId, selectConversation } = useConversationStore();
  const { user } = useAuthStore();
  const active = selectedConversationId === conversation.id;

  // Lấy tên hiển thị cho conversation
  const getDisplayName = () => {
    if (conversation.type === 'group') {
      return conversation.name || 'Nhóm';
    }

    // Private chat: hiển thị tên của người kia
    const otherMember = conversation.participants?.find(m => m.userId !== user?.id);
    return otherMember?.user?.displayName || otherMember?.user?.username || 'Unknown';
  };

  // Format thời gian
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / 3600000);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
  };

  const lastMessageTime = conversation.lastMessage?.createdAt || conversation.createdAt;
  const lastMessagePreview = conversation.lastMessage?.content || 'Bắt đầu cuộc trò chuyện';

  return (
    <div
      onClick={() => selectConversation(conversation.id)}
      className={`
        container-conversation 
        ${active ? "bg-brandcolor/40 rounded-2xl" : ""} 
        flex items-center gap-2 p-3 cursor-pointer
        hover:bg-brandcolor/20 transition-colors duration-200
      `}
    >
      {/* avatar */}
      <div className="">
        <div className="cover-avatar w-12 h-12 relative">
          <img
            className="h-full w-full object-cover rounded-full"
            src="avatar-skeleton.jpeg"
            alt="avatar user"
          />
          {conversation.type === 'group' && (
            <div className="absolute -bottom-1 -right-1 bg-brandcolor rounded-full p-1">
              <i className="fa-solid fa-users text-white text-[8px]"></i>
            </div>
          )}
        </div>
      </div>

      {/* content */}
      <div className="wrapper-content flex-1 min-w-0">
        {/* heading */}
        <div className="heading flex justify-between items-center">
          {/* user name */}
          <div className="user-name text-white font-medium truncate">
            <h2 className="truncate">{getDisplayName()}</h2>
          </div>

          {/* time sent message */}
          <div className="time-sent text-[#666880] text-[11px] ml-2 flex-shrink-0">
            <span>{formatTime(lastMessageTime)}</span>
          </div>
        </div>

        {/* context */}
        <div className="context flex justify-between items-center text-[#666880]">
          {/* text message */}
          <p className="line-clamp-1 text-[12px] pr-2 flex-1">
            {lastMessagePreview}
          </p>

          {/* count unread */}
          {conversation.unreadCount && conversation.unreadCount > 0 && (
            <span className={`
              ${active ? "hidden" : "bg-brandcolor"}
              flex items-center text-center justify-center text-white font-bold 
              h-5 min-w-[20px] px-1 rounded-full text-[11px] shrink-0
            `}>
              {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Conversation
