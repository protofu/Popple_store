import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { oauthAPI } from "../api/services/OAuth";
import AuthLayout from "./layouts/AuthLayout";
import SignUpPage from "./SignUpPage";
import { setCookie } from "../utils/CookieUtils";
import SweetAlert2 from "react-sweetalert2";
import { poppleAlert } from "../utils/PoppleAlert";


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
        setCookie("accessToken", res.data.accessToken, { path: "/"});
        console.log("추가정보 없이 로그인 성공" + res.data.accessToken);
        window.location.href="/";
        return;
      } else if (res.data.deleted) {
        // "탈퇴한 회원입니다. 새로 가입하시겠습니까?"
        poppleAlert.check("탈퇴한 회원입니다.", "새로 가입하시겠습니까?", () => {
          setAuthData(res.data);
        }, () => {
          window.location.href="/";
        });
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

  console.log(authData);
  if (authData && !authData.ableToLogin) {
    return (
      <AuthLayout>
        <SignUpPage oAuth={true} authData={authData} onOAuthSubmit={onSubmit}/>
      </AuthLayout>
    );
  }
 

  return (
    <div>
      로그인 처리중...
    </div>
  );
}
