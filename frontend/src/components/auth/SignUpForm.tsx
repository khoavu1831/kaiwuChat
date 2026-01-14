import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../stores/useAuthStore';
import { useNavigate } from 'react-router';
import Logo from '../logo/Logo';

function SignUpForm() {
  const signupSchema = z
    .object({
      firstName: z.string().min(1, "Tên bắt buộc phải có"),
      lastName: z.string().min(1, "Họ bắt buộc phải có"),
      username: z.string().min(3, "Tên đăng nhập gồm ít nhất 3 kí tự"),
      password: z.string().min(6, "Mật khẩu gồm ít nhất 6 kí tự"),
      confirmPassword: z.string(),
      acceptTerms: z.literal(true, {
        error: () => ({ message: "Điều khoản bắt buộc" })
      }),
      email: z.email("Email không hợp lệ")
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Mật khẩu không khớp",
      path: ["confirmPassword"]
    });

  type SignUpFormValues = z.infer<typeof signupSchema>;

  const { signUp } = useAuthStore();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpFormValues>({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = async (data: SignUpFormValues) => {
    const { username, password, email, firstName, lastName } = data;

    // gọi backend => signup
    await signUp(username, password, email, firstName, lastName);

    navigate('/signin');
  };
  return (
    <div className="z-10 bg-basecolor lg:min-w-100 md:rounded-xl">

      {/* wrapper content  */}
      <div className="flex max-sm:flex-col items-center justify-between p-8">

        {/* logo: max-sm */}
        <div className="md:hidden w-full flex justify-center items-center mb-4">
          <Logo />
        </div>

        {/* form */}
        <div className="flex flex-col w-full">

          {/* heading */}
          <h1 className="text-2xl font-semibold text-center text-[white] md:mb-4 mb-8">Tạo tài khoản</h1>

          {/* form-content */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
            action=""
            method="post"
          >

            {/* first name + last name */}
            <div className="flex gap-4 justify-between md:max-w-100">

              {/* first name */}
              <div className="flex flex-col gap-1.5 text-white text-[14px]">
                <label htmlFor="firstName">Tên:</label>
                <input
                  type="text"
                  className="w-full h-10 py-3 px-2 bg-[#2c2e42] rounded-md border-2 border-[#666880] outline-none focus:border-brandcolor duration-500"
                  id='firstName'
                  {...register("firstName")}
                />

                {/* show error */}
                {errors.firstName && (
                  <p className='text-red-500 text-[12px]'>
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* last name */}
              <div className="flex flex-col gap-1.5 text-white text-[14px]">
                <label htmlFor="lastName">Họ:</label>
                <input
                  type="text"
                  className="w-full h-10 py-3 px-2 bg-[#2c2e42] rounded-md border-2 border-[#666880] outline-none focus:border-brandcolor duration-500"
                  id='lastName'
                  {...register("lastName")}
                />

                {/* show error */}
                {errors.lastName && (
                  <p className='text-red-500 text-[12px]'>
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* username field */}
            <div className="flex flex-col gap-1.5 md:min-w-100 text-white text-[14px]">
              <label htmlFor="username">Tên đăng nhập:</label>
              <input
                type="text"
                className="md:min-w-98.5 h-10 py-3 px-2 bg-[#2c2e42] rounded-md border-2 border-[#666880] outline-none focus:border-brandcolor duration-500"
                id='username'
                {...register("username")}
              />

              {/* show error */}
              {errors.username && (
                <p className='text-red-500 text-[12px]'>
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* email field */}
            <div className="flex flex-col gap-1.5 md:min-w-100 text-white text-[14px]">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="md:min-w-98.5 h-10 py-3 px-2 bg-[#2c2e42] rounded-md border-2 border-[#666880] outline-none focus:border-brandcolor duration-500"
                id='email'
                {...register("email")}
              />

              {/* show error */}
              {errors.email && (
                <p className='text-red-500 text-[12px]'>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* password field */}
            <div className="flex flex-col gap-1.5 md:min-w-100 text-white text-[14px]">
              <label htmlFor="password">Mật khẩu:</label>
              <input
                type="password"
                className="md:min-w-98.5 h-10 py-3 px-2 bg-[#2c2e42] rounded-md border-2 border-[#666880] outline-none focus:border-brandcolor duration-500"
                id='password'
                {...register("password")}
              />

              {/* show error */}
              {errors.password && (
                <p className='text-red-500 text-[12px]'>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* confirm password field */}
            <div className="flex flex-col gap-1.5 md:min-w-100 text-white text-[14px]">
              <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
              <input
                type="password"
                className="md:min-w-98.5 h-10 py-3 px-2 bg-[#2c2e42] rounded-md border-2 border-[#666880] outline-none focus:border-brandcolor duration-500"
                id='confirmPassword'
                {...register("confirmPassword")}
              />

              {/* show error */}
              {errors.confirmPassword && (
                <p className='text-red-500 text-[12px]'>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* terms */}
            <div className="flex flex-col w-full">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  className="cursor-pointer mt-0.5 appearance-none w-3 h-3 rounded-full bg-[#2c2e42] border border-[#666880] checked:bg-brandcolor"
                  id="acceptTerms"
                  {...register("acceptTerms")}
                />
                <label className="text-white text-[12px]">Đồng ý với <a className="text-brandcolor" href=""> điều khoản</a> của chúng tôi</label>
              </div>

              {/* show error */}
              {errors.acceptTerms && (
                <p className='text-red-500 text-[12px]'>
                  {errors.acceptTerms.message}
                </p>
              )}
            </div>

            {/* button sign in */}
            <button
              disabled={isSubmitting}
              className="w-full py-3 px-4 text-white text-[12px] bg-brandcolor rounded-md cursor-pointer"
            >
              Xác nhận
            </button>

            {/* sign in field */}
            <div className="flex gap-1 text-[12px]">
              <p className="text-white">Đã có tài khoản?</p>
              <a href="/signin" className="text-brandcolor">Đăng nhập tại đây</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUpForm