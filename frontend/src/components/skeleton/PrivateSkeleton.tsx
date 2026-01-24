function PrivateSkeleton() {
  return (
    <div className="bg-basecolor max-w-72.5 flex flex-col items-center">
      <div className="cover-image-skeleton h-full w-full p-4">
        <img
          className="w-full h-full object-cover rounded-2xl"
          src="private-skeleton.png"
          alt="friend-skeleton"
        />
      </div>
      <span className="text-white text-sm text-center">Kết bạn để bắt đầu trò chuyện nào</span>
    </div>
  )
}

export default PrivateSkeleton