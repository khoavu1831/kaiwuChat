import SignUpForm from "../components/auth/SignUpForm"

function SignUpPage() {
  return (
    <>
      <div className="md:flex items-center justify-center bg-linear-to-t from-brandcolor min-h-dvh md:py-4 overflow-y-auto font-mono">

        {/* logo */}
        <div className="hidden absolute top-0 left-0 w-full md:flex items-center pt-12 pl-10">
          <div className="h-10 w-10">
            <img className="h-full w-full object-cover" src="logo.png" alt="logo" />
          </div>
          <span className="font-bold text-2xl">kaiwuChat</span>
        </div>

        {/* wrapper form */}
        <SignUpForm />
      </div>
    </>
  )
}

export default SignUpPage