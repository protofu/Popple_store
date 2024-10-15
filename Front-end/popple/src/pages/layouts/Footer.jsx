import { useNavigate } from "react-router-dom";
import styles from "./styles/Footer.module.css";
import Insta from "../../assets/Insta.png";
import Github from "../../assets/Github.png";

export default function Footer() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleExternalNavigation = (url) => {
    window.location.href = url;
  };

  return (
    <div className={styles.container}>
      <div className={styles.footerContainer}>
        <div className={styles.footerInfo}>
          <div>
            <p>Popeye</p>
            <p>서울특별시 종로구 우정국로2길 21 대왕빌딩 7층</p>
            <p>문의 : sungjae0512@gmail.com</p>
            <p>고객센터 : 24H 상시 운영</p>
            <br />
            <p>&copy;
              <span className={styles.copyrights}>Popeye Corp.</span>
              All rights reserved.
            </p>
          </div>
          <div className={styles.icons}>
            <img src={Insta} alt="인스타 이미지" onClick={() => handleExternalNavigation("https://www.instagram.com")} />
            <img src={Github} alt="깃허브 이미지" onClick={() => handleExternalNavigation("https://github.com/Popple-store/Popple")}/>
          </div>
        </div>
        <div className={styles.footerNav}>
          <ul>
            <li className={styles.subNavTitle} onClick={() => handleNavigation("/login")}>팝업/전시회</li>
            <ul className={styles.subMenu}>
              <li>팝업</li>
              <li>전시회</li>
              <li>지도로 보기</li>
            </ul>
          </ul>
          <ul>
            <li className={styles.subNavTitle} onClick={() => handleNavigation("/login")}>마이페이지</li>
            <ul className={styles.subMenu}>
              <li>정보수정</li>
              <li>나의리뷰</li>
              <li>예약목록</li>
            </ul>
          </ul>
          <ul>
            <li className={styles.subNavTitle} onClick={() => handleNavigation("/login")}>이벤트</li>
            <ul className={styles.subMenu}>
              <li>이벤트</li>
            </ul>
          </ul>
          <ul>
            <li className={styles.subNavTitle} onClick={() => handleNavigation("/login")}>고객센터</li>
            <ul className={styles.subMenu}>
              <li>FAQ</li>
              <li>1:1 문의하기</li>
            </ul>
          </ul>
        </div>
      </div>
    </div>
  );
};
