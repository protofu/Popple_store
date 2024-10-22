import kakao from "../assets/kakao_symbol.png";
import google from "../assets/google_symbol.png";
import company from "../assets/company.png";
import CustomLoginButton from "../components/common/CustomLoginButton";
import { authAPI } from "../api/services/Auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../utils/CookieUtils";

export default function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value, // id에 따라 값을 업데이트
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // 기본 폼 제출 방지
    console.log(user)
    try {
      const res = await authAPI.login(user);
      console.log(res.status)
      console.log("로그인 성공");
      if(res.status === 200){
        setCookie("accessToken", res.data.accessToken, { path: "/"});
        navigate("/")
      }
    } catch (error) {
      alert("비밀번호 또는 이메일 오류입니다.")
      console.error("로그인 실패" + error);
    }
  };

  const inputStyle =
    "w-[300px] h-[50px] border border-[#ccc] rounded-[8px] focus:border-[#8900E1] focus:border-2 focus:outline-none px-2";

  return (
    <div className="flex items-center justify-center min-h-full">
      <div className="flex flex-col items-center justify-center mx-auto gap-2.5">
        <h1 className="mb-10 text-[36px] text-gray-900 font-semibold">LOGIN</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center mx-auto gap-2.5">
          <input
            type="email"
            id="email"
            className={inputStyle}
            placeholder="이메일"
            value={user.email} // 상태에서 값 설정
            onChange={handleChange} // 값 변경 핸들러 추가
          />
          <input
            type="password"
            id="password"
            className={inputStyle}
            placeholder="비밀번호"
            value={user.password} // 상태에서 값 설정
            onChange={handleChange} // 값 변경 핸들러 추가
          />
          <button type="submit">
            <CustomLoginButton text={"로그인"} type="submit"/>
          </button>
        </form>
        <CustomLoginButton text={"회원가입"} path="/policy" />
        <div className="flex items-center my-4 w-[300px]">
          <hr className="flex-grow border-t border-[#ccc]" />
          <span className="mx-2 text-[#888]">or</span>
          <hr className="flex-grow border-t border-[#070505]" />
        </div>
        <CustomLoginButton img={kakao} text={"카카오 로그인"} />
        <CustomLoginButton img={google} text={"구글 로그인"} />
        <CustomLoginButton img={company} text={"기업 회원가입"} path={"/policy"} />
      </div>
    </div>
  );
}
