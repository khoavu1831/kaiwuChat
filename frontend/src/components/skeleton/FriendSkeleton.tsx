function FriendSkeleton() {
  return (
    <div className="bg-basecolor max-w-72.5 flex flex-col items-center">
      <div className="cover-image-skeleton h-full w-full p-2 rounded-2xl">
        <img
          className="w-full h-full object-cover rounded-2xl"
          src="friend-skeleton.png"
          alt="friend-skeleton"
        />
      </div>
      <span className="text-white text-sm text-center px-4">Kết bạn để bắt đầu trò chuyện nào</span>
    </div>
  )
}

export default FriendSkeleton