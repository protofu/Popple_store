import { useNavigate } from "react-router-dom";
import CateButton from "../components/common/CateButton";
import PostCarousel from "../components/poster-card/PostCarousel";
import styles from "./styles/MainPage.module.css";
import EventCard from "../components/EventCard";
// import eventImg from "../assets/event.png";
import eventImg from "../assets/img2.png";

export default function MainPage() {
  const navigate = useNavigate(); 

  const handleNavigate = (path) => {
    navigate(path);
  };

  const example = {
    slogun: "DIALOGUE IN THE DARK",
    title: "어둠속의대화",
    duration: "오픈런",
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
      <EventCard slogun={example.slogun} title={example.title} duration={example.duration} img={eventImg}/>
    </div>
  );
};
