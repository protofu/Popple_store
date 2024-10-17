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
      }
    } catch (err) {
      console.error(err);
      alert(err.res.data.message);
    }
  };

  if (authData && !authData.ableToLogoin) {
    return (
      <AuthLayout>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input className="bg-cyan-200 block m-1" {...register("email", { value: authData.email})} />
          <input className="bg-cyan-200 block m-1" {...register("nickname", { value: authData.nickname})}/>
          <input className="bg-cyan-200 block m-1" {...register("name", { value: authData.name})}/>
          <input className="bg-cyan-200 block m-1" {...register("birth", { value: authData.birth})}/>
          {/* <input className="bg-cyan-200 block m-1" {...register("gender")}/> */}
          <button>확인</button>
        </form>
      </AuthLayout>
    );
  }
 

  return (
    <div>
      로그인 처리중...
    </div>
  );
}
