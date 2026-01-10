import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';

const signinSchema = z.object({
  username: z.string().min(3, "Vui lòng nhập tên đăng nhập"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu")
});

function SignInPage() {
  type SignInFormValues = z.infer<typeof signinSchema>;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInFormValues>({
    resolver: zodResolver(signinSchema)
  });

  const onSubmit = async (data: SignInFormValues) => {
    console.log("sign in");
  };

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

        {/* wrapper form */}
        <div className="z-10 bg-[#1b1c29] lg:min-w-196 max-sm:h-full md:rounded-xl">

          {/* wrapper content  */}
          <div className="flex max-sm:flex-col items-center justify-between p-8">

            {/* logo: max-sm */}
            <div className="md:hidden w-full flex justify-center items-center mb-4">
              <div className="h-10 w-10 mr-1">
                <img className="h-full w-full object-cover bg-maincolor rounded-full" src="logo.png" alt="logo" />
              </div>
              <span className="font-bold text-2xl text-white">kaiwuChat</span>
            </div>

            {/* left section */}
            <div className="flex flex-col max-sm:w-full">

              {/* heading */}
              <div className="flex flex-col items-center text-[white]">
                <h1 className="text-2xl font-semibold">Welcome back!</h1>
                <h2 className="text-[14px] text-[#666880] py-2 mb-3">Cả nhà chát chít vui vẻ.</h2>
              </div>

              {/* form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
                method="post"
              >

                {/* username field */}
                <div className="flex flex-col gap-1.5 md:min-w-100 text-white text-[14px]">
                  <label htmlFor="username">Tên đăng nhập:</label>
                  <input
                    type="text"
                    className="md:min-w-98.5 h-10 py-3 px-2 bg-[#2c2e42] rounded-md border-2 border-[#666880] outline-none focus:border-maincolor duration-500"
                    id='username'
                    {...register("username")}
                  />
                  {errors && (
                    <p className='text-red-500 text-[12px]'>
                      {errors.username?.message}
                    </p>
                  )}
                </div>

                {/* password file */}
                <div className="flex flex-col gap-1.5 md:min-w-100 text-white text-[14px]">
                  <label htmlFor="password">Mật khẩu:</label>
                  <input
                    type="text"
                    className="md:min-w-98.5 h-10 py-3 px-2 bg-[#2c2e42] rounded-md border-2 border-[#666880] outline-none focus:border-maincolor duration-500"
                    id='password'
                    {...register("password")}
                  />
                  {errors && (
                    <p className='text-red-500 text-[12px]'>
                      {errors.password?.message}
                    </p>
                  )}
                </div>

                {/* forgot password field */}
                <a href="/signup" className="text-maincolor text-[12px] cursor-pointer">
                  Quên mật khẩu?
                </a>

                {/* button sign in */}
                <button
                  className="w-full py-3 px-4 text-white text-[12px] bg-maincolor rounded-md cursor-pointer"
                  disabled={isSubmitting}
                >
                  Đăng nhập
                </button>

                {/* sign up field */}
                <div className="flex gap-1 text-[12px] my-2">
                  <p className="text-white">Chưa có tài khoản?
                  </p>
                  <a href="/signup" className="text-maincolor">Đăng kí ngay</a>
                </div>
              </form>


            </div>

            {/* right section */}
            <div className="hidden lg:flex flex-col gap-8 items-center">
              <div className="h-50 w-50">
                <img src="qrcode.png" alt="qr-prank" />
              </div>

              <div className="flex flex-col gap-2 max-w-60">
                <h1 className="text-xl font-semibold text-center text-white">Đăng nhập với QR Code</h1>
                <h3 className="text-center text-[#666880] text-sm">Quét mã ngay để đăng nhập nhanh</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignInPage