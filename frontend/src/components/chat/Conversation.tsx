import { useUIStore } from "../../stores/useUIStore"

function Conversation({ id }: { id: string }) {
  const { activeId, setActive } = useUIStore();
  const active = activeId === id;

  return (
    <div
      onClick={() => setActive(id)}
      className=
      {`
        container-conversation 
        ${active ? "bg-brandcolor/40 rounded-2xl" : ""} 
        flex items-center gap-2 p-3 cursor-pointer
      `}
    >
      {/* avatar */}
      <div className="">
        <div className="cover-avatar w-12 h-12">
          <img
            className="h-full w-full object-cover rounded-full"
            src="avatar.jpg"
            alt="avatar user"
          />
        </div>
      </div>

      {/* content */}
      <div className="wrapper-content">
        {/* heading */}
        <div className="heading flex justify-between">
          {/* user name */}
          <div className="user-name text-white">
            <h2>Name Name</h2>
          </div>

          {/* time sent message */}
          <div className="time-sent text-[#666880] text-[13px]">
            <span>12:45pm</span>
          </div>
        </div>

        {/* context */}
        <div className="context flex justify-between items-center text-[#666880]">
          {/* text message */}
          <p className="line-clamp-1 text-[13px] pr-2">
            Hello! Long time no see! I have a nice job for you.
          </p>

          {/* count unread */}
          <span className=
            {`
              ${active ? "hidden" : "bg-brandcolor"}
              flex items-center text-center justify-center text-white  font-bold h-5 w-5 rounded-full text-[12px] shrink-0
            `}
          >
            3
          </span>
        </div>
      </div>
    </div>
  )
}

export default Conversation