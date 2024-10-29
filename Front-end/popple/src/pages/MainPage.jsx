import { useNavigate } from "react-router-dom";
import CateButton from "../components/common/CateButton";
import PostCarousel from "../components/poster-card/PostCarousel";
import styles from "./styles/MainPage.module.css";
import EventCard from "../components/EventCard";
import eventImg from "../assets/img1.png";
import eventImg2 from "../assets/img2.png";
import eventImg3 from "../assets/img3.png";
import eventImg4 from "../assets/img4.png";
import PostCard from "../components/poster-card/PostCard";
import { useState } from "react";

export default function MainPage() {
  // 초기 상태는 팝업(true)을 보여주도록 설정
  const [isPop, setIsPop] = useState(true);

  const navigate = useNavigate(); 

  const handleNavigate = (path) => {
    navigate(path);
  };

  //  팝업 -> 전시 클릭시 상태 변환 메서드
  const handlePopToEx = () => {
    setIsPop(false);
  };
  //  전시 -> 팝업 클릭시 상태 변환 메서드
  const handleExToPop = () => {
    setIsPop(true);
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
    }, {
      slogun: "DIALOGUE IN THE DARK",
      title: "어둠속의대화",
      duration: "오픈런",
      img: eventImg
    }, {
      slogun: "DIALOGUE IN THE DARK",
      title: "어둠속의대화",
      duration: "오픈런",
      img: eventImg2
    }
  ];
  const example2 = [
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
    }
  ];
  const example3 = [
    {
      img: eventImg4,
      title: "어둠속의대화",
      addr: "백악관 B동 3층",
      duration: "2024.10.11 ~ 2024.10.28",
    }, {
      img: eventImg3,
      title: "어둠속의대화",
      addr: "백악관 B동 3층",
      duration: "2024.10.11 ~ 2024.10.28",
    }, {
      img: eventImg2,
      title: "어둠속의대화",
      addr: "백악관 B동 3층",
      duration: "2024.10.11 ~ 2024.10.28",
    }, {
      img: eventImg,
      title: "어둠속의대화",
      addr: "백악관 B동 3층",
      duration: "2024.10.11 ~ 2024.10.28",
    }
  ];

  return (
    <div className="flex flex-col items-center mt-4">
      <div className={styles.cateButton}>
        <CateButton text={"NEW"} />
      </div>
      {/* 포스터 캐러셀 */}
      <div className={styles.carouselContainer}>
        <PostCarousel />
      </div>
      {/* 이벤트 섹션 */}
      <div className="mt-10">
        <h1 className="text-center text-2xl mb-5">EVENT</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {example.map((item, index) => (
              <EventCard key={index} slogun={item.slogun} title={item.title} duration={item.duration} img={item.img}/>
          ))}
        </div>
      </div>
      {/* 전시 혹은 이벤트 섹션 */}
      <div className="mt-10">
        <div className="text-center text-2xl mb-5">
        {isPop ? (
          <div>
            <p onClick={() => handleExToPop()} className="inline font-bold text-slate-900 cursor-pointer">팝업</p><span> | </span>
            <p onClick={() => handlePopToEx()} className="inline cursor-pointer">전시</p>
          </div>
        ) : (
          <div>
            <p onClick={() => handleExToPop()} className="inline cursor-pointer">팝업</p><span> | </span>
            <p onClick={() => handlePopToEx()} className="inline font-bold text-slate-900 cursor-pointer">전시</p>
          </div>
        )}
        </div>
        {/* 전시 팝업에 따른 변화 */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {isPop ?
            <>
              {example2.map((item, index) => (
                <PostCard key={index} id={index} img={item.img} title={item.title} addr={item.addr} duration={item.duration} styles={"w-full h-auto"}/>
              ))}
            </> :
            <>
              {example3.map((item, index) => (
                <PostCard key={index} img={item.img} title={item.title} addr={item.addr} duration={item.duration} styles={"w-full h-auto"}/>
              ))}
            </>
          }
        </div>
      </div>
    </div>
  );
};
