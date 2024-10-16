import styles from "./styles/LoginPage.module.css";
import kakaoButton from "../assets/kakao_login.png";
import googleButton from "../assets/google_login.png";

export default function LoginPage() {
  return (
    <div className={styles.loginContainer}>
      <input type="text" />
      <input type="text" />
      <div className={styles.loginButton}>
        로그인
      </div>
      <img src={kakaoButton} alt="카카오 로그인 버튼" />
      <img src={googleButton} alt="구글 로그인 버튼" />
    </div>
  );
};
