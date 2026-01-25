import SignInForm from "../components/auth/SignInForm"
import Logo from "../components/logo/Logo"

function SignInPage() {

  return (
    <div className="md:flex items-center justify-center bg-linear-to-t from-brandcolor h-dvh overflow-y-auto font-mono">

      {/* Logo */}
      <div className="hidden absolute top-0 left-0 w-full md:flex items-center pt-12 pl-10">
        <Logo />
      </div>

      {/* form */}
      <SignInForm />
    </div>
  )
}

export default SignInPage