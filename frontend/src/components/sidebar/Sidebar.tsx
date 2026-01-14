import Logo from "../logo/Logo"
import { useUIStore } from "../../stores/useUIStore";
import Conversation from "../chat/Conversation";

function Sidebar() {
  const { tab, setTab } = useUIStore();
  const converList = [];
  for (let index = 0; index < 15; index++) {
    converList.push(<Conversation key={index} id={String(index)} />);
  }

  return (
    <>
      <div className="flex flex-col font-mono md:max-w-3/10 max-md:w-full">

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
                placeholder:text-[#666880] placeholder:text-[12px]
                focus:outline-none text-white text-sm
                py-3 px-3 w-full caret-white
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
              private-chat flex items-center rounded-t-xl py-1 px-2 
              transition-all duration-600 ease-in-out cursor-pointer
            `}>
              <i className="fa-solid fa-user"></i>
            </button>

            {/* group chat tab */}
            <button
              onClick={() => setTab("group")}
              className={`
              ${tab === "group" ? "bg-brandcolor/40" : ""}
              private-chat flex items-center justify-between rounded-t-xl py-1 px-2 
              transition-all duration-600 ease-in-out cursor-pointer
            `}>
              <i className="fa-solid fa-users"></i>
            </button>
          </div>

          <div className={`
            create-group-button transition-all duration-600 ease-in-out
            ${tab === "group" ?
              "opacity-100 translate-x-0 cursor-pointer" :
              "opacity-0 translate-x-2 pointer-events-none"}
            `}>
            <i className="fa-solid fa-plus hover:text-brandcolor transition-all duration-500"></i>
          </div>
        </div>

        {/* conversation list */}
        {tab === "private" && (
          <div className="conversation-container bg-brandcolor/10 rounded-t-2xl">
            <div className="flex flex-col overflow-y-auto p-2">
              {converList}
            </div>
          </div>
        )}

        {tab === "group" && (
          <div className="conversation-container bg-brandcolor/10 rounded-t-2xl">
            <div className="flex flex-col overflow-y-auto p-2">
              {converList}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Sidebar