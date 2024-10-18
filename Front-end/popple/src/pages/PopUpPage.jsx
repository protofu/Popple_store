import PostCarousel from "../components/poster-card/PostCarousel";
import eventImg from "../assets/img1.png";
import eventImg2 from "../assets/img2.png";
import eventImg3 from "../assets/img3.png";
import eventImg4 from "../assets/img4.png";
import PostCard from "../components/poster-card/PostCard";
import PosterSlide from "../components/poster-card/PosterSlide";

export default function PopUpPage() {

  // 팝업 더미 데이터
  const popUp = [
    {
      img: eventImg,
      title: "어둠속의대화",
      addr: "백악관 B동 3층",
      duration: "2024.10.11 ~ 2024.10.28",
    }, {
      img: eventImg2,
      title: "어둠속의대화",
      addr: "백악관 B동 3층",
      duration: "2024.10.11 ~ 2024.10.28",
    }, {
      img: eventImg3,
      title: "어둠속의대화",
      addr: "백악관 B동 3층",
      duration: "2024.10.11 ~ 2024.10.28",
    }, {
      img: eventImg4,
      title: "어둠속의대화",
      addr: "백악관 B동 3층",
      duration: "2024.10.11 ~ 2024.10.28",
    }, {
      img: eventImg,
      title: "어둠속의대화",
      addr: "백악관 B동 3층",
      duration: "2024.10.11 ~ 2024.10.28",
    }, {
      img: eventImg2,
      title: "어둠속의대화",
      addr: "백악관 B동 3층",
      duration: "2024.10.11 ~ 2024.10.28",
    }, {
      img: eventImg3,
      title: "어둠속의대화",
      addr: "백악관 B동 3층",
      duration: "2024.10.11 ~ 2024.10.28",
    }, {
      img: eventImg4,
      title: "어둠속의대화",
      addr: "백악관 B동 3층",
      duration: "2024.10.11 ~ 2024.10.28",
    }, {
      img: eventImg,
      title: "어둠속의대화",
      addr: "백악관 B동 3층",
      duration: "2024.10.11 ~ 2024.10.28",
    }, {
      img: eventImg2,
      title: "어둠속의대화",
      addr: "백악관 B동 3층",
      duration: "2024.10.11 ~ 2024.10.28",
    }, {
      img: eventImg3,
      title: "어둠속의대화",
      addr: "백악관 B동 3층",
      duration: "2024.10.11 ~ 2024.10.28",
    }, {
      img: eventImg4,
      title: "어둠속의대화",
      addr: "백악관 B동 3층",
      duration: "2024.10.11 ~ 2024.10.28",
    }
  ];

  return (
    <div className="mx-auto border-2 max-w-full">
      <PostCarousel />
      <div className="mx-auto"> 
        <h1>현재</h1>
      </div>
      <div className="flex justify-center mx-auto">
        <PosterSlide items={popUp}/>
      </div>
    </div>
  );
};
