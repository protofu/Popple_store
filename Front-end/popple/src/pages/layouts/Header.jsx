import { useNavigate } from "react-router-dom";
import styles from "./styles/Header.module.css";
import mainLogo from "../../assets/MainLogo.png";

export default function Header() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  }
  return (
    <header className={styles.header}>
      <div className={styles.miniNav}>
        <li onClick={() => handleNavigation("/login")}>LOGIN</li> |
        <li>JOIN US</li> |
        <li>HELP</li>
      </div>
      <div className={styles.logoContainer}>
        <img src={mainLogo} alt="메인 로고" />
      </div>
      <div className={styles.mainNav}>
        <li onClick={() => handleNavigation("/login")}>팝업</li>
        <li>전시회</li>
        <li>EVENT</li>
      </div>
    </header>
  );
};
