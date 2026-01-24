function GroupSkeleton() {
  return (
    <div className="bg-basecolor max-w-72.5 flex flex-col items-center">
      <div className="cover-image-skeleton h-full w-full p-4 rounded-2xl">
        <img
          className="w-full h-full object-cover rounded-2xl"
          src="group-skeleton.png"
          alt="friend-skeleton"
        />
      </div>
      <span className="text-white">Tạo nhóm ngay</span>
    </div>
  )
}

export default GroupSkeleton