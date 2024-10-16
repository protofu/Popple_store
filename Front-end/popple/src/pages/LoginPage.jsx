import styles from "./styles/LoginPage.module.css";
import kakao from "../assets/kakao_symbol.png";
import google from "../assets/google_symbol.png";
import company from "../assets/company.png";
import CustomLoginButton from "../components/common/CustomLoginButton";

export default function LoginPage() {
  return (
    <div className={styles.loginContainer}>

      
      <input type="text" />
      <input type="text" />
      <div className={styles.loginButton}>
        로그인
      </div>
      <CustomLoginButton img={company} text={"회원가입"}/>
      <CustomLoginButton img={kakao} text={"카카오 로그인"}/>
      <CustomLoginButton img={google} text={"구글 로그인"}/>
      <CustomLoginButton img={company} text={"기업 회원가입"}/>
    </div>
  );
};
