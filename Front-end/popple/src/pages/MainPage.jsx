import CateButton from "../components/common/CateButton";
import PostCarousel from "../components/poster-card/PostCarousel";
import styles from "./styles/MainPage.module.css";

export default function MainPage() {
  return (
    <div className="flex flex-col items-center">
      <div className={styles.cateButton}>
        <CateButton text={"NEW"} />
      </div>
      <div className={styles.carouselContainer}>
        <PostCarousel />
      </div>
      {/* <button onClick={() => handleNavigate("map-view")}> 맵 보기</button> */}
    </div>
  );
};
