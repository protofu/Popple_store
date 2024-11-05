import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../api/services/Auth";
import { getCookie, setCookie } from "../../utils/CookieUtils";
import { useForm } from "react-hook-form";
import { poppleAlert } from "../../utils/PoppleAlert";
import moment from "moment";

const ChangeInfo = () => {
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

    const [userInfo, setUserInfo] = useState();
    const getUserInfo = async () => {
        const token = getCookie("accessToken");
        if (token) {
            const id = jwtDecode(token).id;
            const res = await authAPI.getUser(id);
            res.data.birth = moment(new Date(res.data.birth[0], res.data.birth[1] - 1, res.data.birth[2])).format('YYYY-MM-DD');
            setUserInfo(res.data);
        } 
    };
    useEffect(() => {
        getUserInfo();
    }, []);

    ////////////////////////////
  const [signUpField, setSignUpField] = useState([
    {
      id: 1,
      name: "email",
      label: "이메일",
      type: "email",
      readOnly: true,
    },
    {
      id: 2,
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
      readOnly: false,
    },
    {
      id: 3,
      name: "birth",
      label: "생년월일",
      type: "text",
      placeholder: "생년월일",
      condition: { required: true, valueAsDate: true },
      readOnly: true,
    },
    {
      id: 4,
      name: "gender",
      label: "성별",
      type: "radio",
      array: [
        { label: "남성", value: true },
        { label: "여성", value: false },
      ],
      condition: { required: true },
      readOnly: true,
    },
  ]);

    const onSubmit = async (data) => {
        try {
            const req = { nickname: data.nickname }
            const res = await authAPI.update(req);
            if(res.status === 200){
                setCookie("accessToken", res.data.accessToken, { path: "/"});
                await poppleAlert.alert("", "회원정보 수정이 완료되었습니다.");
                window.location.href="/"
              }
        } catch (error) {
            console.log(error);   
        }
    };


    return (
        <div className="w-full">
            { userInfo ? (
                <form
                onSubmit={handleSubmit(onSubmit)}
              >
                {signUpField.map((f) => {
                  return (
                    <div
                      key={f.id}
                      className="my-10"
                    >
                      <label
                        htmlFor={f.name}
                        className="inline-block text-sm font-medium text-gray-900 dark:text-white text-left w-1/5"
                      >
                        {f.label}
                        {!f.readOnly && <span className="text-red-500">*</span>}
                      </label>
                      {f.type === "radio" ? (
                        <div key={f.id} className="inline-flex">
                          {f.array.map((g, index) => (
                            <div key={index}>
                              <input
                                type={f.type}
                                id={g.label}
                                defaultValue={g.value}
                                checked={userInfo[f.name] === g.value}
                                disabled={f.readOnly}
                              />
                              <label htmlFor={g.label} className={`ml-2 mr-4`}>
                                {g.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="inline">
                          <input
                            key={f.id}
                            type={f.type}
                            id={f.name}
                            {...register(f.name, {
                              ...f.condition,
                            })}
                            className={`${inputStyle} ${f.readOnly && "bg-gray-200"}`}
                            defaultValue={userInfo[f.name]}
                            placeholder={f.placeholder}
                            readOnly={f.readOnly}
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
                <button className=" bg-popple text-white rounded-lg p-3">
                    수정하기
                </button>
              </form>
            ):  (
                <div>로딩 중...</div>   
            )}
        </div>
    );
}
 
export default ChangeInfo;