import { useParams } from "react-router-dom";
import { setCookie } from "../utils/CookieUtils";
import { useEffect } from "react";


export default function OAuthLoginPage() {
  // URL 파라미터에서 OAuth provider 정보를 가져옴 (예: kakao, google)
  const { provider } = useParams(); 

  // URL 쿼리 스트링에서 authorization code를 추출함
  const code = new URLSearchParams(window.location.search).get("code");
  console.log("Authorization Code:", code); // 확인용 콘솔 로그

  // OAuth 로그인에 사용할 API 엔드포인트 매핑
  const oAuthAPI = {
    "kakao" : (code) => oAuthAPI.kakaoLogin(code),
    "google" : (code) => oAuthAPI.googleLogin(code),
  };

  const login = async () => {
    try {
      const res = await oAuthAPI[provider](code);
      if (res.status !== 200) {
        throw new Error("로그인 실패");
      } else {
        setCookie("accessToken", res.data.accessToken, {path: "/"} );
        window.location.href="/";
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    login();
  }, [code]);
 
  return (
    <div>
      로그인 처리중...
    </div>
  );
}
