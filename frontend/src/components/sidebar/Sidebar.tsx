import { useEffect, useState } from "react";
import Logo from "../logo/Logo";
import { useUIStore } from "../../stores/useUIStore";
import { useConversationStore } from "../../stores/useConversationStore";
import { useFriendStore } from "../../stores/useFriendStore";
import Conversation from "../chat/Conversation";
import PrivateSkeleton from "../skeleton/PrivateSkeleton";
import GroupSkeleton from "../skeleton/GroupSkeleton";
import FriendList from "../friend/FriendList";
import FriendRequestList from "../friend/FriendRequestList";
import CreateGroupModal from "../modals/CreateGroupModal";
import CreatePrivateChatModal from "../modals/CreatePrivateChatModal";
import AddFriendModal from "../friend/AddFriendModal";

function Sidebar() {
  const { tab, setTab } = useUIStore();
  const { conversations, loading, loadConversations } = useConversationStore();
  const { friendRequests, loadFriendRequests } = useFriendStore();

  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showCreatePrivateChatModal, setShowCreatePrivateChatModal] = useState(false);
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [showFriendRequests, setShowFriendRequests] = useState(false);

  // Load conversations và friend requests khi component mount
  useEffect(() => {
    loadConversations();
    loadFriendRequests();
  }, []);

  // Filter conversations theo tab
  const privateConversations = conversations.filter(c => c.type === 'private');
  const groupConversations = conversations.filter(c => c.type === 'group');

  const currentList = tab === "private" ? privateConversations :
    tab === "group" ? groupConversations : [];

  const pendingRequestsCount = friendRequests.filter(r => r.status === 'pending').length;

  return (
    <>
      <div className="flex flex-col h-dvh font-mono md:max-w-3/10 max-md:w-full">

        {/* logo */}
        <div className="w-full flex items-center pl-2 py-4">
          <Logo isChatPage />
        </div>

        {/* search bar */}
        <div className="search-bar px-2">
          <div className="wrapper-search flex items-center group bg-[#2c2e42] rounded-2xl">
            <i className="fa-solid fa-magnifying-glass text-[#666880] group-focus-within:text-white transition-colors duration-400 py-0 px-3"></i>
            <input
              className="
                placeholder:text-[# ] placeholder:text-[12px]
                focus:outline-none text-white text-sm
                py-3 px-3 w-full caret-white bg-transparent
              "
              type="text"
              placeholder="Tìm kiếm đoạn chat, liên hệ..." />
          </div>
        </div>

        {/* tabs */}
        <div className="tabs flex justify-between items-center px-2 pt-4 text-white">
          <div className="tabs-nav flex items-center">
            {/* private chat tab */}
            <button
              onClick={() => setTab("private")}
              className={`
              ${tab === "private" ? "bg-brandcolor/40" : ""}
              private-chat flex items-center rounded-t-xl py-3 px-4
              transition-all duration-600 ease-in-out cursor-pointer
            `}>
              <i className="fa-solid fa-user"></i>
              {privateConversations.length > 0 && (
                <span className="ml-2 text-xs bg-brandcolor/60 px-2 py-0.5 rounded-full">
                  {privateConversations.length}
                </span>
              )}
            </button>

            {/* group chat tab */}
            <button
              onClick={() => setTab("group")}
              className={`
              ${tab === "group" ? "bg-brandcolor/40" : ""}
              group-chat flex items-center rounded-t-xl py-3 px-4
              transition-all duration-600 ease-in-out cursor-pointer
            `}>
              <i className="fa-solid fa-users"></i>
              {groupConversations.length > 0 && (
                <span className="ml-2 text-xs bg-brandcolor/60 px-2 py-0.5 rounded-full">
                  {groupConversations.length}
                </span>
              )}
            </button>

            {/* friend tab */}
            <button
              onClick={() => setTab("friend")}
              className={`
              ${tab === "friend" ? "bg-brandcolor/40" : ""}
              friend-tab flex items-center rounded-t-xl py-3 px-4
              transition-all duration-600 ease-in-out cursor-pointer relative
            `}>
              <i className="fa-solid fa-user-group"></i>
              {pendingRequestsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                  {pendingRequestsCount > 9 ? '9+' : pendingRequestsCount}
                </span>
              )}
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            {/* Create group button */}
            <div className={`
              transition-all duration-600 ease-in-out
              ${tab === "group"
                ? "opacity-100 translate-x-0 cursor-pointer"
                : "opacity-0 translate-x-2 pointer-events-none"}
              `}>
              <i
                onClick={() => setShowCreateGroupModal(true)}
                className="fa-solid fa-plus hover:text-brandcolor transition-all duration-500"
              ></i>
            </div>

            {/* Add friend button */}
            <div className={`
              transition-all duration-600 ease-in-out
              ${tab === "friend"
                ? "opacity-100 translate-x-0 cursor-pointer"
                : "opacity-0 translate-x-2 pointer-events-none"}
              `}>
              <i
                onClick={() => setShowAddFriendModal(true)}
                className="fa-solid fa-user-plus hover:text-brandcolor transition-all duration-500"
              ></i>
            </div>

            {/* Start private chat button */}
            <div className={`
              transition-all duration-600 ease-in-out
              ${tab === "private"
                ? "opacity-100 translate-x-0 cursor-pointer"
                : "opacity-0 translate-x-2 pointer-events-none"}
              `}>
              <i
                onClick={() => setShowCreatePrivateChatModal(true)}
                className="fa-solid fa-comment-medical hover:text-brandcolor transition-all duration-500"
              ></i>
            </div>
          </div>
        </div>

        {/* conversation/friend list */}
        <div className="conversation-container bg-brandcolor/10 rounded-t-2xl overflow-y-auto chat-scroll flex-1">
          {tab === "friend" ? (
            // Friend tab content
            <div className="flex flex-col h-full">
              {/* Friend requests toggle */}
              {pendingRequestsCount > 0 && (
                <div className="p-2">
                  <button
                    onClick={() => setShowFriendRequests(!showFriendRequests)}
                    className="w-full flex items-center justify-between p-3 bg-brandcolor/20 rounded-lg hover:bg-brandcolor/30 transition-colors"
                  >
                    <span className="text-white font-medium">
                      Lời mời kết bạn ({pendingRequestsCount})
                    </span>
                    <i className={`fa-solid fa-chevron-${showFriendRequests ? 'up' : 'down'} text-white`}></i>
                  </button>
                </div>
              )}

              {/* Show friend requests or friend list */}
              {showFriendRequests ? (
                <FriendRequestList />
              ) : (
                <FriendList />
              )}
            </div>
          ) : (
            // Conversation tabs content
            <>
              {loading ? (
                // Loading skeleton
                tab === "private" ? <PrivateSkeleton /> : <GroupSkeleton />
              ) : currentList.length === 0 ? (
                // Empty state
                <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                  <i className={`
                    fa-solid ${tab === "private" ? "fa-user" : "fa-users"}
                    text-[#666880] text-4xl mb-3
                  `}></i>
                  <p className="text-[#666880] text-sm">
                    {tab === "private" && "Chưa có cuộc trò chuyện nào"}
                    {tab === "group" && "Chưa có nhóm nào"}
                  </p>
                  <button
                    onClick={() => {
                      if (tab === "private") setShowCreatePrivateChatModal(true);
                      else setShowCreateGroupModal(true);
                    }}
                    className="mt-4 px-4 py-2 bg-brandcolor text-white rounded-lg hover:bg-brandcolor/80 transition-colors"
                  >
                    <i className={`fa-solid fa-plus mr-2`}></i>
                    {tab === "private" ? "Bắt đầu trò chuyện" : "Tạo nhóm mới"}
                  </button>
                </div>
              ) : (
                // Conversation list
                <div className="flex flex-col p-2">
                  {currentList.map((conversation) => (
                    <Conversation key={conversation.id} conversation={conversation} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <CreateGroupModal
        isOpen={showCreateGroupModal}
        onClose={() => setShowCreateGroupModal(false)}
      />
      <CreatePrivateChatModal
        isOpen={showCreatePrivateChatModal}
        onClose={() => setShowCreatePrivateChatModal(false)}
      />
      <AddFriendModal
        isOpen={showAddFriendModal}
        onClose={() => setShowAddFriendModal(false)}
      />
    </>
  )
}

export default Sidebar
