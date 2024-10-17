import { useNavigate } from "react-router-dom";
import CateButton from "../components/common/CateButton";
import PostCarousel from "../components/poster-card/PostCarousel";
import styles from "./styles/MainPage.module.css";

export default function MainPage() {
  const navigate = useNavigate(); 

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col items-center">
      <div className={styles.cateButton}>
        <CateButton text={"NEW"} />
      </div>
      <div className={styles.carouselContainer}>
        <PostCarousel />
      </div>
      {/* <button onClick={() => handleNavigate("map-view")}> 맵 보기</button> */}
      <button onClick={() => handleNavigate("/regist")}>팝업/전시 등록</button>
    </div>
  );
};
