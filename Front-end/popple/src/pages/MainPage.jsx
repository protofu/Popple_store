import { useNavigate } from "react-router-dom";
import CateButton from "../components/common/CateButton";
import PostCarousel from "../components/poster-card/PostCarousel";
import styles from "./styles/MainPage.module.css";
import EventCard from "../components/EventCard";
import eventImg from "../assets/img1.png";
import eventImg2 from "../assets/img2.png";
import eventImg3 from "../assets/img3.png";
import eventImg4 from "../assets/img4.png";

export default function MainPage() {
  const navigate = useNavigate(); 

  const handleNavigate = (path) => {
    navigate(path);
  };

  const example = [
    {
      slogun: "DIALOGUE IN THE DARK",
      title: "어둠속의대화",
      duration: "오픈런",
      img: eventImg
    }, {
      slogun: "DIALOGUE IN THE DARK",
      title: "어둠속의대화",
      duration: "오픈런",
      img: eventImg2
    }, {
      slogun: "DIALOGUE IN THE DARK",
      title: "어둠속의대화",
      duration: "오픈런",
      img: eventImg3
    }, {
      slogun: "DIALOGUE IN THE DARK",
      title: "어둠속의대화",
      duration: "오픈런",
      img: eventImg4
    }
];

  return (
    <div className="flex flex-col items-center">
      <div className={styles.cateButton}>
        <CateButton text={"NEW"} />
      </div>
      <div className={styles.carouselContainer}>
        <PostCarousel />
      </div>
      <div className="flex flex-wrap gap-4">
        {example.map((item, index) => (
            <EventCard key={index} slogun={item.slogun} title={item.title} duration={item.duration} img={item.img}/>
        ))}
      </div>
      
    </div>
  );
};
