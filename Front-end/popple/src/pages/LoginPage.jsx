import kakao from "../assets/kakao_symbol.png";
import google from "../assets/google_symbol.png";
import company from "../assets/company.png";
import CustomLoginButton from "../components/common/CustomLoginButton";

export default function LoginPage() {

  const inputStyle = "w-[300px] h-[50px] border border-[#ccc] rounded-[8px] focus:border-[#8900E1] focus:border-2 focus:outline-none px-2"

  return (
    <div className="flex items-center justify-center min-h-full">
      <div className="flex flex-col items-center justify-center mx-auto gap-2.5">
        <h1 className="mb-10 text-[36px] text-gray-900 font-semibold">LOGIN</h1>
        <input type="email" className={inputStyle} placeholder="이메일"/>
        <input type="password" className={inputStyle} placeholder="비밀번호"/>
        <CustomLoginButton text={"로그인"} />
        <CustomLoginButton text={"회원가입"} path="/sign-up"/>
        <div className="flex items-center my-4 w-[300px]">
          <hr className="flex-grow border-t border-[#ccc]" />
          <span className="mx-2 text-[#888]">or</span>
          <hr className="flex-grow border-t border-[#070505]" />
        </div>
        <CustomLoginButton img={kakao} text={"카카오 로그인"}/>
        <CustomLoginButton img={google} text={"구글 로그인"}/>
        <CustomLoginButton img={company} text={"기업 회원가입"}/>
      </div>
    </div>
  );
};
