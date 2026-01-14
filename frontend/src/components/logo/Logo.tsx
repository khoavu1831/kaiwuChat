type LogoProps = {
  isChatPage?: boolean
}
function Logo({ isChatPage = false }: LogoProps) {
  return (
    <>
      {/* logo */}
      <div className={`h-10 w-10 ${isChatPage ? "mr-1" : "max-sm:mr-1"}`}>
        <img className={`h-full w-full object-cover ${isChatPage ? "bg-brandcolor rounded-full" : "max-sm:bg-brandcolor max-sm:rounded-full"}`} src="logo.png" alt="logo" />
      </div>
      <span className={`font-bold text-2xl ${isChatPage ? "text-brandcolor" : "max-sm:text-white"}`}>kaiwuChat</span>
    </>
  )
}

export default Logo