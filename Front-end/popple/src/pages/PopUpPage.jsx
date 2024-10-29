
import eventImg from "../assets/img1.png";
import eventImg2 from "../assets/img2.png";
import eventImg3 from "../assets/img3.png";
import eventImg4 from "../assets/img4.png";

import eventIcon from "../assets/icons/party.png";
import popupIcon from "../assets/icons/popup-icon.png";
import popularIcon from "../assets/icons/popular-icon.png";
import { useEffect, useState } from "react";
import PostCarousel from "../components/poster-card/PostCarousel";
import PostCard from "../components/poster-card/PostCard";
import PosterSlide from "../components/poster-card/PosterSlide";
import EventCard from "../components/EventCard";

export default function PopUpPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
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
  
  const eventList = [{
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
  }];

  // 현재 페이지에 따라 아이템 인덱스 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = popUp.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(popUp.length / itemsPerPage);

  // 페이지 변경 함수
  const handlePageChange = (page) => {
    setCurrentPage(page);
  }
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerPage(4);
      } else if (width < 1024) {
        setItemsPerPage(6);
      } else {
        setItemsPerPage(12);
      }
    };

    updateItemsPerPage(); // 컴포넌트가 마운트될 때 실행
    window.addEventListener("resize", updateItemsPerPage); // 리사이즈 이벤트 리스너 추가

    return () => {
      window.removeEventListener("resize", updateItemsPerPage); // 컴포넌트 언마운트 시 리스너 제거
    };
  }, []);
  const titleStyle = "flex items-center w-full m-10 ml-0";
  const textStyle = "text-2xl ml-2 font-bold";
  const titleImgStyle = "inline w-[2.5rem]";

  return (
    <div className="
    w-full mx-auto 
    xl: max-w-full
    mt-4 
    "
    >
      <PostCarousel />
      {/* 인기있는 POP-UP */}
      <div className={titleStyle}> 
        <img src={popularIcon} alt="인기 아이콘" className={titleImgStyle} />
        <h1 className={textStyle}>인기있는 POP-UP</h1>
      </div>
      <div className="flex justify-center mx-auto">
        <PosterSlide items={popUp}/>
      </div>
      {/* EVENT */}
      <div className={titleStyle}>
        <img src={eventIcon} alt="이벤트 아이콘" className={titleImgStyle} />
        <h1 className={textStyle}>EVENT</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {
          eventList.map((item, index) => (
            <EventCard key={index} slogun={item.slogun} title={item.title} duration={item.duration} img={item.img} />
          ))
        }
      </div>
      {/* POP-UP */}
      <div className={titleStyle}>
        <img src={popupIcon} alt="팝업 아이콘" className={titleImgStyle} />
        <h1 className={textStyle}>POP-UP 둘러보기</h1>
      </div>
      <div>
        <div className="
        flex flex-wrap justify-center gap-6 
        lg:grid lg:grid-cols-4 
        xl:grid xl:grid-cols-5
        ">
          {currentItems.map((item, index) => (
            <PostCard
              key={index}
              img={item.img}
              title={item.title}
              addr={item.addr}
              duration={item.duration}
              styles={"aspect-[2/3] w-[15rem] h-auto"}
            />
          ))}
        </div>
        {/* 페이지네이션 버튼 */}
        <div className="flex justify-center my-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`mx-2 p-2 border rounded ${
                currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white text-black"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
