import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { register } from "swiper/element";
import { authAPI } from "../api/services/Auth";
import { data } from "autoprefixer";
import { useNavigate } from "react-router-dom";

export default function SignUpPage({oAuth = false, authData, onOAuthSubmit}) {

  const inputStyle = "w-[300px] h-[50px] border border-[#ccc] rounded-[8px] focus:border-[#8900E1] focus:border-2 focus:outline-none px-2";
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    getValues,
    clearErrors,
    setError
  } = useForm();
  

  const [isNotDuplicateEmail, setIsNotDuplicateEmail] = useState(false);
  const [isDuplicateNickname, setIsDuplicateNickname] = useState(null);

  const duplicateEmail = async() => {
    console.log("이메일 체크");
    const email = getValues("email");
    const regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    // 이메일 정규식 체크하여, 통과하면 중복체크
    if(regExp.test(email)) {
        // 중복체크
        const res = await authAPI.duplicateEmail(email);
        if (res.data) {
            // 중복체크 성공 시
            setIsNotDuplicateEmail(true);
            clearErrors("email");
        } else {
            setIsNotDuplicateEmail(false);
            setError("email", {
              type: 'custom',
              message: '중복된 이메일입.',
              duplicateError: '중복된 이메일.' });
        }
    } else {
        // 이메일 정규식 체크 실패 또는 중복된 이메일일 경우.
        setIsNotDuplicateEmail(false);
        setError("email", { type: 'custom', message: '올바른 이메일 형식이 아닙니다.' });
    }
}
const emailInputReset = () => {
  setIsNotDuplicateEmail(false);
}


 //////////////////////////// 
  const [signUpField, setSignUpField] = useState([
    {
      id: 1,
      onInput: emailInputReset,
      duplicateEmail:duplicateEmail,
      vali: "  isNotDuplicate: () => isNotDuplicateEmail || '고구마'", 
      name: "email",
      label: "이메일",
      type: "email",
      placeholder: "123@naver.com",
      condition: {
        required: "이메일은 필수값이다.",
        maxLength: 255,
        duplicateError: '중복된 이메일입니다.',  // 중복 메시지 포함
        validate: () => isNotDuplicateEmail? clearErrors() : "고구마",
        pattern:{
          message:"올바른 이메일 형식이 아닙니다.",
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        }
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
          validate: (value) => {
            if (watch('password') != value) {
              return "비밀번호가 일치하지 않습니다."
            }
          },
          pattern: {
            message: "비밀번호는 알파벳 소문자와 숫자를 포함하여 8글자 이상으로 작성해주세요.",
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
      condition: { required: true},
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

  console.log(watch())
  const onSubmit = async (data) => {
    try {
      
      data.birth = data.birth.toISOString().split('T')[0];
      const res = await authAPI.create(data);
      alert("가입 성공");
      navigate('/login');
    } catch (error) {
      console.error("가입 실패"+error)
      alert("가입 실패" + error.message)
    }
  }


  
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
              {f.label}<span className="text-red-500">*</span>
            </label>
            {f.type === "radio" ? (
              <div key={f.id} className="flex w-1/2 ">
                {f.array.map((g, index) => (
                  <div key={index}>
                    <input
                      type={f.type}
                      id={g.label}
                      value={g.value}
                      {...register(f.name, { required: true })}
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
                  onInput={f.onInput}
                  onChange={f.duplicateEmail}
                  type={f.type}
                  id={f.name}
                  {...register(f.name, {
                    ...f.condition,
                    validate: {
                      
                    },
                })}
                  className={inputStyle}
                  placeholder={f.placeholder}
                  required={f.type==="date" ? true : false}
                />
                {errors[f.name] && (
                  <div>
                    <p className="text-red-500 text-xs mt-1">
                      {
                        errors[f.name].message
                      }
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
