import { useCallback, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { register } from "swiper/element";
import { authAPI } from "../api/services/Auth";
import { data } from "autoprefixer";
import { useNavigate } from "react-router-dom";



export default function CompanySignUpPage(){

  const inputStyle = "w-[300px] h-[50px] border border-[#ccc] rounded-[8px] focus:border-[#8900E1] focus:border-2 focus:outline-none px-2";
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm();

  //기업 정보 입력 필드 - 1
  const [companyField, setCompanyField] = useState([
    {
      id: 1,
      name: "com-num",
      label: "사업자 등록번호",
      type: "text",
      placeholder: "111-11-11111",
      condition: { required: "사업자 등록번호는 필수값입니다.", maxLength: 255 },
    },
    {
      id: 2,
      name: "name",
      label: "기업명",
      type: "text",
      placeholder: "kosta",
      condition: { required: "기업명은 필수값입니다.", maxLength: 255 },
    },
    {
      id: 3,
      name: "leader",
      label: "대표자 성명",
      type: "text",
      placeholder: "최인규",
      condition: { required: "대표자 성명은 필수값입니다.", maxLength: 255 },
    },
  ]);
  const [companyField2, setCompanyField2] = useState([
    {
      id: 1,
      name: "tel",
      label: "연락처",
      type: "text",
      placeholder: "010-1234-5678",//형식 지정?
      condition: { required: "연락처는 필수값입니다.", maxLength: 255 },
    },
    {
      id: 2,
      name: "address",
      label: "주소",
      type: "text",
      placeholder: "예) 국립중앙박물관, 대왕빌딩",// 맵 api
      condition: { required: "주소는 필수값입니다.", maxLength: 255 },
    },
    {
      id: 3,
      name: "sector",
      label: "기업 업종",
      type: "text",
      placeholder: "증권",//드롭다운임
      condition: { required: "기업업종은 필수값입니다.", maxLength: 255 },
      array: [
        { label: "증권"},
        { label: "의료"},
      ],
      condition: { required: true},
    },
    
  ]);

  //email 입력필드
  const [emailField, setEmailField] = useState([
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
      id: 3,
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
    }

  ]);

  return(
   <form onSubmit={handleSubmit(onsubmit)}>
      <h1 className="mt-[30px] text-center mb-10 text-xl"> 기업 정보입력</h1>
      <div className="flex flex-col mx-auto w-5/6"> 
        <div className="grid grid-cols-2 gap-x-15"> 
          <div className="flex flex-col gap-10">
            {companyField.map((a)=>{
              return(
                <div key={a.id} className="flex w-2/5 h-3/4 container mx-auto items-center justify-between my-1">
              <label
                htmlFor={a.name}
                className="block text-sm font-medium text-gray-900 dark:text-white text-center"
              >
                {a.label}<span className="text-red-500">*</span>
              </label>
              <div className="flex w-1/2">
                <input key={a.id}
                  type={a.type}
                  id={a.name}
                  {...register(a.name, a.condition)}
                  className={inputStyle}
                  placeholder={a.placeholder}
                  required={true}
                />
                {errors[a.name] && (
                  <div>
                    <p className="text-red-500 text-xs mt-1">
                      {
                        errors[a.name].message
                      }
                    </p>
                  </div>
                )}
                  
              </div>
            </div>
              )
            })}
          </div>
          <div className="flex flex-col gap-10">
          {companyField2.map((a)=>{
              return(
                <div key={a.id} className="flex w-2/5 h-3/4 container mx-auto items-center justify-between my-1">
              <label
                htmlFor={a.name}
                className="block text-sm font-medium text-gray-900 dark:text-white text-center"
              >
                {a.label}<span className="text-red-500">*</span>
              </label>
              <div className="flex w-1/2">
                <input key={a.id}
                  type={a.type}
                  id={a.name}
                  {...register(a.name, a.condition)}
                  className={inputStyle}
                  placeholder={a.placeholder}
                  required={true}
                />
                {errors[a.name] && (
                  <div>
                    <p className="text-red-500 text-xs mt-1">
                      {
                        errors[a.name].message
                      }
                    </p>
                  </div>
                )}
                  
              </div>
            </div>
              )
            })}
          </div>
        </div>
      </div>
      
      <hr className="w-1/2  mx-auto my-4" />
      <h1 className="mt-[30px] text-center mb-10 text-xl"> Email 정보입력</h1>
      {emailField.map((e) => {
        return (
            <div key={e.id} className="flex w-2/5 h-3/4 container mx-auto items-center justify-between my-10">
              <label
                htmlFor={e.name}
                className="block text-sm font-medium text-gray-900 dark:text-white text-center"
              >
                {e.label}<span className="text-red-500">*</span>
              </label>
              <div className="flex w-1/2">
                <input key={e.id}
                  type={e.type}
                  id={e.name}
                  {...register(e.name, e.condition)}
                  className={inputStyle}
                  placeholder={e.placeholder}
                  required={true}
                />
                {errors[e.name] && (
                  <div>
                    <p className="text-red-500 text-xs mt-1">
                      {
                        errors[e.name].message
                      }
                    </p>
                  </div>
                )}
                  
              </div>
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