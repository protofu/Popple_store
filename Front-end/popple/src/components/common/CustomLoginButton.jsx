import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function CustomLoginButton({img, text, path}) {
  const navigate = useNavigate();
  // 단순 페이지 이동 핸들러
  const handleNavigate = () => {
    navigate(path);
  };

  // OAuth 로그인 핸들러
  const handleOAuthLogin = () => {
    if (text === "카카오 로그인") {
      const params = new URLSearchParams({
        response_type: "code",
        redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
        client_id: import.meta.env.VITE_KAKAO_CLIENT_ID,
      });
      const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;

      window.location.href = KAKAO_URL;
    } else if (text === "구글 로그인") {
      const params = new URLSearchParams({
        scope: "email profile",
        response_type: "code",
        redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      });
      const GOOGLE_URL = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

      window.location.href = GOOGLE_URL;
    }
  };

  const condiStyle = `border-2 rounded-[6px] flex items-center w-[300px] h-[45px] px-2 cursor-pointer ${text === "로그인" ? 'bg-[#8900E1] border-[#8900E1] text-[#fff]' : 'bg-transparent border-[#ccc]'}`; 
  
  if (img === undefined) {
    return (
      <div className={condiStyle} onClick={() => handleNavigate(path)}>
        <div className="w-full text-center text-[16px] font-semibold">
          {text}
        </div>
      </div>
    );
  }
  return (
    <div className={condiStyle} onClick={() => handleOAuthLogin(text)}>
      <img src={img} alt="이미지" className="w-[30px] h-auto"/>
      <div className="w-full text-center text-[16px] font-semibold">{text}</div>
    </div>
  );
};

// PropTypes 설정
CustomLoginButton.propTypes = {
  img: PropTypes.element,
  text: PropTypes.string.isRequired,
  path: PropTypes.string,
};