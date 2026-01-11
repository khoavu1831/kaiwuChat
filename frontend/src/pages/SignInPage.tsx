import SignInForm from "../components/auth/SignInForm"

function SignInPage() {
  return (
    <>
      <div className="md:flex items-center justify-center bg-linear-to-t from-maincolor h-dvh overflow-y-auto font-mono">

        {/* logo */}
        <div className="hidden absolute top-0 left-0 w-full md:flex items-center pt-12 pl-10">
          <div className="h-10 w-10">
            <img className="h-full w-full object-cover" src="logo.png" alt="logo" />
          </div>
          <span className="font-bold text-2xl">kaiwuChat</span>
        </div>

        {/* form */}
        <SignInForm />
      </div>
    </>
  )
}

export default SignInPage