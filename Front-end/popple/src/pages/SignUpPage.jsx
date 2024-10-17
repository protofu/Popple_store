import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { register } from "swiper/element";

export default function SignUpPage({oAuth = false, authData, onOAuthSubmit}) {

  const inputStyle = "w-[300px] h-[50px] border border-[#ccc] rounded-[8px] focus:border-[#8900E1] focus:border-2 focus:outline-none px-2";
  
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm();
  
  const [signUpField, setSignUpField] = useState([
    {
      id: 1,
      name: "email",
      label: "이메일",
      type: "email",
      placeholder: "123@naver.com",
      condition: { required: "이메일은 필수값이다.", maxLength: 255 },
    },
    {
      id: 2,
      name: "name",
      label: "이름",
      type: "text",
      placeholder: "이름을 입력해주세요",
      condition: { required: true, maxLength: 255 },
    },
    {
      id: 3,
      name: "password",
      label: "비밀번호",
      type: "password",
      placeholder: "알파벳 소문자와 숫자를 포함하여 8글자 이상",
      condition: {
        required: "비밀번호는 필수 입력값입니다.",
        pattern: {
          message: "비밀번호는 알파벳 소문자와 숫자를 포함하여 8글자 이상으로 작성해주세요.",
          value: /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/,
      },
    },
    },
    {
      id: 4,
      name: "password-chk",
      label: "비밀번호 확인",
      type: "password",
      placeholder: "비밀번호 재입력",
      condition: {
          required: "비밀번호 확인은 필수 입력값입니다.",
          pattern: {
            message: "비밀번호는 알파벳 소문자와 숫자를 포함하여 8글자 이상으로 작성해주세요.",
            value: /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/,
        },
      },
    },
    {
      id: 5,
      name: "nickname",
      label: "닉네임",
      type: "nickname",
      placeholder: "닉네임을 입력해주세요",
      condition: { required: true, maxLength: 255 },
    },
    {
      id: 6,
      name: "birth",
      label: "생년월일",
      type: "date",
      placeholder: "생년월일",
      condition: { required: true, valueAsDate: true },
    },
    {
      id: 7,
      name: "gender",
      label: "성별",
      type: "radio",
      array: [
        { label: "남성", value: true },
        { label: "여성", value: false },
      ],
      condition: { required: true, valueAsDate: true },
    },
  ]);
  useEffect(() => {
    if(oAuth) {
      setValue("email", authData?.email)
      setValue("name", authData?.name)
      setValue("nickname", authData?.nickname)
      setSignUpField(prev => prev.filter(field => field.type !== 'password'));
    }  
  }, []);
  
  const onSubmit = (data) => console.log(data);
  return (
    <form onSubmit={oAuth ? handleSubmit(onOAuthSubmit) : handleSubmit(onSubmit)}>
      <h1 className="mt-[30px] text-center mb-10 text-xl">회원가입</h1>
      {signUpField.map((f) => {
        return (
          <div key={f.id} className="flex w-2/5 h-3/4 container mx-auto items-center justify-between my-10">
            <label
              htmlFor={f.name}
              className="block text-sm font-medium text-gray-900 dark:text-white text-center"
            >
              {f.label}
            </label>
            {f.type === "radio" ? (
              <div key={f.id} className="flex w-1/2 ">
                {f.array.map((g, index) => (
                  <div key={index}>
                    <input
                      type={f.type}
                      id={g.label}
                      name={f.name}
                      value={g.value}
                    />
                    <label htmlFor={g.label} className="ml-2 mr-4">
                      {g.label}
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-1/2">
                <input
                  key={f.id}
                  type={f.type}
                  id={f.name}
                  {...register(f.name, f.condition)}
                  className={inputStyle}
                  placeholder={f.placeholder}
                  required={f.type==="date" ? true : false}
                />
                {errors[f.name] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[f.name].message}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
      {/* <div className="flex flex-col gap-12 w-1/3">
          { signUpField.map(f => (
              <label
                key={f.id}
                htmlFor={f.name}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"
              >
                {f.label}
              </label>
          ))}
          </div> */}

      {/* <div className="flex flex-col gap-8 w-2/3">
          { signUpField.map(f => {
            if (f.type === "radio") {
              return <div key={f.id} className="inline">
                { f.array.map((g, index) => (
                    <>
                      <input type={f.type} id={g.label} name={f.name} value={g.value} />
                      <label htmlFor={g.label} className="ml-2 mr-4">{g.label}</label>
                    </>
                ))}
                </div>
            } else {
              return (
                <div>
                  <input
                    key={f.id}
                    type={f.type}
                    id={f.name}
                    {...register(f.name, f.condition)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                    placeholder={f.placeholder}
                    required
                  />
                  {errors[f.name] && <p className="text-red-500 text-xs mt-1">This field is required</p>}
                </div>
              )
            }
          })}
          </div> */}
      <div className="flex justify-center items-center">
        <button type="submit" className=" bg-popple text-white rounded-lg p-3">
          가입하기
        </button>
      </div>
    </form>
  );
}
