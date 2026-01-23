import MessageItem from './MessageItem';

function ChatWindow() {
  const messageListExample = [
    { isOwn: true, message: "hello anh iu hello anh iu hello anh iu hello anh iu hello anh iu hello anh iu hello anh iu hello anh iu", id: 1 },
    { isOwn: false, message: "hello anh iu", id: 1 },
    { isOwn: false, message: "hello anh iu", id: 1 },
    { isOwn: true, message: "hello anh iu", id: 1 },
    // { isOwn: true, message: "hello anh iu", id: 1 },
    // { isOwn: false, message: "hello anh iu", id: 1 },
    // { isOwn: true, message: "hello anh iu", id: 1 },
    // { isOwn: true, message: "hello anh iu", id: 1 },
    // { isOwn: false, message: "hello anh iu", id: 1 },
    // { isOwn: true, message: "hello anh iu", id: 1 },
    // { isOwn: true, message: "hello anh iu hello anh iu hello anh iu hello anh iu hello anh iu hello anh iu hello anh iu hello anh iu", id: 1 },
    // { isOwn: false, message: "hello anh iu", id: 1 },
    // { isOwn: false, message: "hello anh iu", id: 1 },
    // { isOwn: true, message: "hello anh iu", id: 1 },
    // { isOwn: true, message: "hello anh iu", id: 1 },
    // { isOwn: false, message: "hello anh iu", id: 1 },
    // { isOwn: true, message: "hello anh iu", id: 1 },
    // { isOwn: true, message: "hello anh iu", id: 1 },
    // { isOwn: false, message: "hello anh iu", id: 1 },
    // { isOwn: true, message: "hello anh iu", id: 1 },
    // { isOwn: true, message: "hello anh iu hello anh iu hello anh iu hello anh iu hello anh iu hello anh iu hello anh iu hello anh iu", id: 1 },
    // { isOwn: false, message: "hello anh iu", id: 1 },
    // { isOwn: false, message: "hello anh iu", id: 1 },
    // { isOwn: true, message: "hello anh iu", id: 1 },
    // { isOwn: true, message: "hello anh iu", id: 1 },
    // { isOwn: false, message: "hello anh iu", id: 1 },
    // { isOwn: true, message: "hello anh iu", id: 1 },
    // { isOwn: true, message: "hello anh iu", id: 1 },
    // { isOwn: false, message: "hello anh iu", id: 1 },
    // { isOwn: true, message: "hello anh iu 222", id: 1 },
  ];

  const emptyList = null;
  let defaultNewChat = false;
  if (emptyList !== null) {
    defaultNewChat = false;
  }

  return (
    <div className='flex-1 overflow-y-auto p-4 chat-scroll'>
      <div className='flex flex-col mt-auto gap-1'>
        {
          !defaultNewChat ?
            (
              messageListExample.map(m => (
                <MessageItem isOwn={m.isOwn} message={m.message} />
              ))
            ) :
            (
              <div className="flex flex-col items-center justify-center">
                <div className="cover-avatar h-15 w-15 my-2 rounded-full overflow-hidden">
                  <img
                    className='h-full w-full'
                    src="avatar.jpg"
                    alt="avatar"
                  />
                </div>

                <span className='text-white'>NAME NAME</span>
                <span className='text-[#666880]'>Bắt đầu cuộc trò chuyện ngay nào!</span>
              </div>
            )
        }
      </div>
    </div>
  )
}

export default ChatWindow