import { register } from "swiper/element";
import { useForm } from "react-hook-form";

export default function SignUpPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-[30px]">
          <h1 className="text-center mb-10">Email 회원가입</h1>

          <div className="grid gap-x-20 gap-y-8 mb-6 grid-cols-2 ">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true, maxLength: 255 })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
              placeholder="이메일 형식 입력"
              required
            />
            {errors.email && <p>이메일을 입력해주세요.</p>}

            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"
            >
              이름
            </label>
            <div className="h-[40px]">
              <input
                type="text"
                id="name"
                {...register("name", { required: true, maxLength: 255 })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="이름을 입력해주세요"
                required
              />
            </div>

            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"
            >
              비밀번호
            </label>
            <div className="h-[40px]">
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 255,
                  pattern: /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/,
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="알파벳 소문자와 숫자를 포함하여 8글자 이상"
                required
              />
              {errors.password && errors.password.type === "required" && (
                <p className="text-red-500">비밀번호를 입력해주세요.</p>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <p className="text-red-500">비밀번호는 최소 8자 이상입니다.</p>
              )}
              {errors.password && errors.password.type === "pattern" && (
                <p className="text-red-500">소문자와 숫자를 포함하여 주십시오.</p>
              )}
            </div>
          </div>
          <button className="">가입하기</button>
        </div>
      </form>
    </>
  );
}
