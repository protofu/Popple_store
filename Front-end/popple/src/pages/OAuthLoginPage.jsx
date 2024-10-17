import { useParams } from "react-router-dom";
import { setCookie } from "../utils/CookieUtils";
import { useEffect, useState } from "react";
import { oauthAPI } from "../api/services/OAuth";
import { useForm } from "react-hook-form";
import AuthLayout from "./layouts/AuthLayout";


export default function OAuthLoginPage() {
  // URL 파라미터에서 OAuth provider 정보를 가져옴 (예: kakao, google)
  const { provider } = useParams(); 

  // URL 쿼리 스트링에서 authorization code를 추출함
  const code = new URLSearchParams(window.location.search).get("code");
  console.log("Authorization Code:", code); // 확인용 콘솔 로그

  const [authData, setAuthData] = useState();

  const login = async () => {
    console.log("login 메서드 ㄱㄱ");
    try {
      const res = await oauthAPI.signUp(provider, code);
      console.log("res 데이터" + res.data);
      if (res.data.accessToken) {
        console.log("추가정보 없이 로그인 성공" + res.data.accessToken);
        window.location.href="/";
        return;
      }
      setAuthData(res.data);
      
      
      // if (res.status !== 200) {
      //   throw new Error("로그인 실패");
      // } else {
      //   setCookie("accessToken", res.data.accessToken, {path: "/"} );
      //   window.location.href="/";
      // }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    login();
  }, [code]);

  const  { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await oauthAPI.login({
        ...authData,
        email: data.email,
        nickname: data.nickname,
        name: data.name,
        birth: data.birth,
      });
      if (res.status == 200) {
        alert("이메일 인증 후 로그인 성공" + res.data.accessToken);
        window.location.href="/";
      }
    } catch (err) {
      console.error(err);
      alert(err.res.data.message);
    }
  };

  const inputStyle = "w-[300px] h-[50px] border border-[#ccc] rounded-[8px] focus:border-[#8900E1] focus:border-2 focus:outline-none px-2"

  if (authData && !authData.ableToLogoin) {
    
    return (
      <AuthLayout>
        <div className="flex justify-center items-center h-full">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            {/* 이메일 필드 */}
            <div className="flex items-center gap-4">
              <label htmlFor="email" className="w-24">이메일</label>
              <input id="email" {...register("email")} defaultValue={authData.email} className={inputStyle}/>
            </div>

            {/* 닉네임 필드 */}
            <div className="flex items-center gap-4">
              <label htmlFor="nickname" className="w-24">닉네임</label>
              <input id="nickname" {...register("nickname")} defaultValue={authData.nickname} className={inputStyle} />
            </div>

            {/* 이름 필드 */}
            <div className="flex items-center gap-4">
              <label htmlFor="name" className="w-24">이름</label>
              <input id="name" {...register("name")} defaultValue={authData.name} className={inputStyle} />
            </div>
            {/* 생일 필드 */}
            <div className="flex items-center gap-4">
              <label htmlFor="birth" className="w-24">생년월일</label>
              <input id="birth" {...register("birth")} defaultValue={authData.birth} className={inputStyle} />
            </div>

            {/* 확인 버튼 */}
            <button>확인</button>
          </form>
        </div>
      </AuthLayout>
    );
  }
 

  return (
    <div>
      로그인 처리중...
    </div>
  );
}
