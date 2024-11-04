import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { authAPI } from "../api/services/Auth";
import { useNavigate } from "react-router-dom";
import { poppleAlert } from "../utils/PoppleAlert";

export default function SignUpPage({ oAuth = false, authData, onOAuthSubmit }) {
  const inputStyle =
    "w-[300px] h-[50px] border border-[#ccc] rounded-[8px] focus:border-[#8900E1] focus:border-2 focus:outline-none px-2";
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch
  } = useForm();

  ////////////////////////////
  const [signUpField, setSignUpField] = useState([
    {
      id: 1,
      name: "email",
      label: "이메일",
      type: "email",
      placeholder: "123@naver.com",
      condition: {
        required: "이메일은 필수값이다.",
        maxLength: 255,
        validate: async (email) => {
          try {
            const res = await authAPI.duplicateEmail(email);
            if (!res.data) {
              return "중복된 이메일입니다.";
            }
          } catch (error) {
          }
        },
        pattern: {
          message: "올바른 이메일 형식이 아닙니다.",
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        },
      },
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
          message:
            "비밀번호는 알파벳 소문자와 숫자를 포함하여 8글자 이상으로 작성해주세요.",
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
        validate: (value) => {
          if (watch("password") != value) {
            return "비밀번호가 일치하지 않습니다.";
          }
        },
        pattern: {
          message:
            "비밀번호는 알파벳 소문자와 숫자를 포함하여 8글자 이상으로 작성해주세요.",
          values: /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/,
        },
      },
    },
    {
      id: 5,
      name: "nickname",
      label: "닉네임",
      type: "nickname",
      placeholder: "닉네임을 입력해주세요",
      condition: {
        required: "닉네임은 필수값이다.",
        maxLength: 255,
        validate: async (nickname) => {
          try {
            const res = await authAPI.duplicateNickname(nickname);
            if (!res.data) {
              return "중복된 닉네임입니다.";
            }
          } catch (error) {
          }
        },
        pattern: {
          message: "올바른 닉네임 형식이 아닙니다.",
          value: /^(?!.*[^\w가-힣])[a-zA-Z0-9가-힣]{2,}$/,
        },
      },
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
      condition: { required: true },
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

  const onSubmit = async (data) => {
    try {
      data.birth = data.birth.toISOString().split("T")[0];
      const res = await authAPI.create(data);
      console.log(res.data)
      poppleAlert.alert("","가입 성공");
      navigate("/login");
      
    } catch (error) {
      poppleAlert.alert("","가입 실패");
    }
  };
  const watchAllFields = watch(); // 모든 입력 필드의 현재 값을 추적

useEffect(() => {
    console.log(watchAllFields);
}, [watchAllFields]); // watchAllFields가 변경될 때마다 콘솔에 출력

  
  return (
    <form
      onSubmit={oAuth ? handleSubmit(onOAuthSubmit) : handleSubmit(onSubmit)}
    >
      <h1 className="mt-[30px] text-center mb-10 text-xl">회원가입</h1>
      {signUpField.map((f) => {
        return (
          <div
            key={f.id}
            className="flex w-2/5 h-3/4 container mx-auto items-center justify-between my-10"
          >
            <label
              htmlFor={f.name}
              className="block text-sm font-medium text-gray-900 dark:text-white text-center"
            >
              {f.label}
              <span className="text-red-500">*</span>
            </label>
            {f.type === "radio" ? (
              <div key={f.id} className="flex w-1/2 ">
                {f.array.map((g, index) => (
                  <div key={index}>
                    <input
                      type={f.type}
                      id={g.label}
                      {...register(f.name, { required: true })}
                      checked={watch(f.name) === g.value}
                      onChange={() => {setValue(f.name, g.value);
                      }}
                      
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
                  {...register(f.name, {
                    ...f.condition,
                  })}
                  className={inputStyle}
                  placeholder={f.placeholder}
                  required={f.type === "date" ? true : false}
                />
                {errors[f.name] && (
                  <div>
                    <p className="text-red-500 text-xs mt-1">
                      {errors[f.name].message}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      <div className="flex justify-center items-center">
        <button className=" bg-popple text-white rounded-lg p-3">
          가입하기
        </button>
      </div>
    </form>
  );
}
