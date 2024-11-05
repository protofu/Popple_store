import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../api/services/Auth";
import { getCookie, setCookie } from "../../utils/CookieUtils";
import { useForm } from "react-hook-form";
import { poppleAlert } from "../../utils/PoppleAlert";
import moment from "moment";
import { companyAuthAPI } from "../../api/services/CompanyAuth";

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

    const [userRole, setUserRole] = useState(null);
    const [userInfo, setUserInfo] = useState();
    const getUserInfo = async () => {
        const token = getCookie("accessToken");
        if (token) {
            const id = jwtDecode(token).id;
            const role = jwtDecode(token).role;
            console.log("Decoded role:", role); 
            const res = await authAPI.getUser(id);
            res.data.birth = moment(new Date(res.data.birth[0], res.data.birth[1] - 1, res.data.birth[2])).format('YYYY-MM-DD');
            if (role === "ROLE_COMPANY") {
              const companyRes = await companyAuthAPI.get(id);
              res.data = { ...res.data, ...companyRes.data };
            }
            setUserInfo(res.data);
            setUserRole(role);
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
          if (!userInfo) {
            return;
          }
          const originalNickName = userInfo.nickname;
          if(nickname !== originalNickName)
          {
            try {
              const res = await authAPI.duplicateNickname(nickname);
              if (!res.data) {
                return "중복된 닉네임입니다.";
              }
            } catch (error) {
              return "닉네임 중복 확인 중 오류가 발생";
            }
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




  const companyFields = [
    {
        id: 5, // Changed to be greater than 4
        name: "buisinessNumber",
        label: "사업자 등록번호",
        type: "text",
        placeholder: "111-11-11111",
        condition: {
            required: "사업자 등록번호는 필수값입니다.",
            maxLength: 255,
        },
        readOnly: false,
    },
    {
        id: 6, // Changed to be greater than 4
        name: "name",
        label: "기업명",
        type: "text",
        placeholder: "kosta",
        condition: { required: "기업명은 필수값입니다.", maxLength: 255 },
        readOnly: false,
    },
    {
        id: 7, // Changed to be greater than 4
        name: "leader",
        label: "대표자",
        type: "text",
        placeholder: "최인규",
        condition: { required: "대표자 성명은 필수값입니다.", maxLength: 255 },
        readOnly: false,
    },
    {
        id: 8, // Changed to be greater than 4
        name: "tel",
        label: "연락처",
        type: "text",
        placeholder: "010-1234-5678", //형식 지정?
        condition: { required: "연락처는 필수값입니다.", maxLength: 255 },
        readOnly: false,
    },
    {
        id: 9, // Changed to be greater than 4
        name: "address",
        label: "주소",
        type: "text",
        placeholder: "예) 국립중앙박물관, 대왕빌딩", // 맵 api
        condition: { required: "주소는 필수값입니다.", maxLength: 255 },
        readOnly: false,
    },
    {
        id: 10, // Changed to be greater than 4
        name: "sector",
        label: "기업 업종",
        type: "text",
        placeholder: "기업 업종 선택", //드롭다운임
        condition: { required: "기업업종은 필수값입니다.", maxLength: 255 },
        readOnly: false,
    },
  ];

  useEffect(() => {
    if (userRole === "ROLE_COMPANY" && signUpField.length === 4) {
      setSignUpField((prevFields) => [...prevFields, ...companyFields]);
    }
  }, [userRole]);

  useEffect(() => {
    if (userInfo) {
      setSignUpField((prevFields) =>
        prevFields.map((field) => {
          if (userRole === "ROLE_COMPANY" && companyFields.some((cf) => cf.id === field.id)) {
            return {
              ...field,
              defaultValue: userInfo[field.name], // userInfo의 값으로 바인딩
            };
          }
          return field;
        })
      );
    }
  }, [userInfo, userRole]);

  const onSubmit = async (data) => {
    try {
        const req = userRole === "ROLE_COMPANY" 
            ? {
                nickname: data.nickname ,
                buisinessNumber: data.buisinessNumber,
                sector: data.sector,
                name: data.name,
                address: data.address,
                tel: data.tel,
                leader: data.leader
              }
            : { nickname: data.nickname };
        const res = await authAPI.update(req);
        if (userRole === "ROLE_COMPANY") {
          await companyAuthAPI.update(userInfo.id, req);
        }
        if(res.status === 200){
            setCookie("accessToken", res.data.accessToken, { path: "/"});
            await poppleAlert.alert("", "회원정보 수정이 완료되었습니다.");
          }
    } catch (error) {
        console.log(error);   
    }
  };


  return (
      <div className="w-full flex justify-center items-center">
          { userInfo ? (
              <form
              onSubmit={handleSubmit(onSubmit)}
            >
              {signUpField.map((f) => {
                return (
                  <div
                    key={f.id}
                    className="my-10 flex items-center justify-start"
                  >
                    <label
                      htmlFor={f.name}
                      className="inline-block text-[15px] font-bold text-gray-900 dark:text-white text-left w-[120px] mr-4"
                    >
                      {f.label}
                      {!f.readOnly && <span className="text-red-500">*</span>}
                    </label>
                    {f.type === "radio" ? (
                      <div key={f.id} className="inline-flex ml-4">
                        {f.array.map((g, index) => (
                          <div key={index}>
                            <input
                              type={f.type}
                              id={g.label}
                              defaultValue={g.value}
                              checked={userInfo[f.name] === g.value}
                              disabled={f.readOnly}
                            />
                            <label htmlFor={g.label} className={`ml-4 mr-4`}>
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
                          className={`${inputStyle} ${f.readOnly && "bg-gray-200"} ml-4`}
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
              <div className="flex justify-center">
              <button className=" bg-popple text-white rounded-lg p-3">
                  수정하기
              </button>
              </div>
            </form>
          ):  (
              <div>로딩 중...</div>   
          )}
      </div>
  );
}
 
export default ChangeInfo;