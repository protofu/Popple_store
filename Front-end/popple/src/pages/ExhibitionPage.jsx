import { useEffect, useState } from "react";

import eventImg from "../assets/exhi_poster/ex1.png";
import eventImg2 from "../assets/exhi_poster/ex2.png";
import eventImg3 from "../assets/exhi_poster/ex3.png";
import eventImg4 from "../assets/exhi_poster/ex4.png";
import eventImg5 from "../assets/exhi_poster/ex5.png";
import eventImg6 from "../assets/exhi_poster/ex6.png";
import eventImg7 from "../assets/exhi_poster/ex7.png";
import eventImg8 from "../assets/exhi_poster/ex8.png";

import eventIcon from "../assets/icons/party.png";
import exhiIcon from "../assets/icons/exhi-icon.png";
import popularIcon from "../assets/icons/popular-icon.png";
import ExhibitionCarousel from "../components/poster-card/ExhibitionCarousel";
import PosterSlide from "../components/poster-card/PosterSlide";
import EventCard from "../components/EventCard";
import PostCard from "../components/poster-card/PostCard";
import MapModal from "../components/map-view/MapModal";
import { exhibitionAPI } from "../api/services/Exhibition";



export default function ExhibitionPage() {
  const posterURL = import.meta.env.VITE_EXHIBITION_POSTER;
  const eventPosterURL = import.meta.env.VITE_EVENT_POSTER;
  
  const type = 2; // 전시
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalToggle = () => {
    setModalOpen((prev) => !prev);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const [exhibitionData, setExhibitionData] = useState([]);
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
      img: eventImg5,
      title: "어둠속의대화",
      addr: "백악관 B동 3층",
      duration: "2024.10.11 ~ 2024.10.28",
    }, {
      img: eventImg6,
      title: "어둠속의대화",
      addr: "백악관 B동 3층",
      duration: "2024.10.11 ~ 2024.10.28",
    }, {
      img: eventImg7,
      title: "어둠속의대화",
      addr: "백악관 B동 3층",
      duration: "2024.10.11 ~ 2024.10.28",
    }, {
      img: eventImg8,
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
    img: eventImg5
  }, {
    slogun: "DIALOGUE IN THE DARK",
    title: "어둠속의대화",
    duration: "오픈런",
    img: eventImg6
  }];

  function dateToString(arr) {
    const [y,m,d] = arr;
    return y+"."+m+"."+d;
  }

  // 전시 가져오기
  const getExhibitions = async () => {
    const res = await exhibitionAPI.getlist(type);
    console.log(res.data);
    setExhibitionData(res.data);
  };

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
    getExhibitions();
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
  const textStyle = "text-[28px] ml-3 font-bold whitespace-nowrap";
  const titleImgStyle = "inline w-[2.5rem]";

  return (
    <div className="w-full mx-auto">
      <ExhibitionCarousel />
      {/* 가장 많이 방문한 POP-UP */}
      <div className={titleStyle}> 
        <img src={popularIcon} alt="인기 아이콘" className={titleImgStyle} />
        <h1 className={textStyle}>인기 전시회</h1>
      </div>
      <div className="flex justify-center mx-auto">
        <PosterSlide items={exhibitionData}/>
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
      {/* EXHIBITION */}
      <div className={titleStyle}>
        <img src={exhiIcon} alt="전시회 아이콘" className={titleImgStyle} />
        <h1 className={textStyle}>전시회 둘러보기</h1>
        <span className="w-[80%] text-right text-[#5464f1]" onClick={handleModalToggle}>지도로 보기</span>
      </div>
      {isModalOpen && <MapModal onClose={handleModalToggle} />}
      <div>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
          {exhibitionData.map((item, index) => (
            <PostCard
              key={item.id}
              id={item.id}
              img={`${posterURL}${item.savedImage}`}
              title={item.exhibitionName}
              addr={item.address}
              duration={dateToString(item.startAt) + " - " + dateToString(item.endAt)}
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
