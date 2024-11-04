import { useEffect, useState } from "react";
import eventIcon from "../assets/icons/party.png";
import exhiIcon from "../assets/icons/exhi-icon.png";
import popularIcon from "../assets/icons/popular-icon.png";
import ExhibitionCarousel from "../components/poster-card/ExhibitionCarousel";
import PosterSlide from "../components/poster-card/PosterSlide";
import EventCard from "../components/EventCard";
import PostCard from "../components/poster-card/PostCard";
import MapModal from "../components/map-view/MapModal";
import { exhibitionAPI } from "../api/services/Exhibition";
import { eventAPI } from "../api/services/Event";
import EventDetailModal from "../components/event/EventDetailModal";



export default function ExhibitionPage() {
  const posterURL = import.meta.env.VITE_EXHIBITION_POSTER;
  const eventPosterURL = import.meta.env.VITE_EVENT_POSTER;
  
  const type = 2; // 전시
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  const handleModalToggle = () => {
    setModalOpen((prev) => !prev);
  };

  // 팝업 관련 이벤트 가져오기
  const [eventList, setEventList] = useState([]);
  const getEvents = async () => {
    const res = await eventAPI.getSpecificList(type);
    const today = new Date(); // 오늘 날짜 가져오기
    const filtered = res.data.filter(item => {
        const endAt = new Date(item.endAt); // endAt을 Date 객체로 변환
        return endAt > today; // 오늘보다 후인지 확인
    });
    setEventList(filtered);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const [exhibitionData, setExhibitionData] = useState([]);

  function dateToString(arr) {
    const [y,m,d] = arr;
    return y+"."+m+"."+d;
  }

  // 조회수
  const [visitCountData, setVisitCountData] = useState([]);
  // 전시 가져오기
  const getExhibitions = async () => {
    const res = await exhibitionAPI.getlist(type);
    const today = new Date(); // 오늘 날짜 가져오기
    const filtered = res.data.filter(item => {
        const endAt = new Date(item.endAt); // endAt을 Date 객체로 변환
        return endAt > today; // 오늘보다 후인지 확인
    });
    const visitCountRes = res.data.sort((a, b) => b.visitCount - a.visitCount);
    setExhibitionData(filtered);
    setVisitCountData(visitCountRes);
  };

  // 현재 페이지에 따라 아이템 인덱스 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = exhibitionData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(exhibitionData.length / itemsPerPage);

  // 페이지 변경 함수
  const handlePageChange = (page) => {
    setCurrentPage(page);
  }
  useEffect(() => {
    getEvents();
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

  const [propEventId, setPropEventId] = useState(null);
  // 이벤트 모달 오픈
  const openEventModal = (id) => {
    setPropEventId(id);
    setIsEventModalOpen(true);
  };

  // 이벤트 모달 닫기
  const CloseEventModal = () => {
    setIsEventModalOpen(false);
  };


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
            <EventCard key={index} id={item.id} slogun={item.eventName} title={item.summary} duration={dateToString(item.startAt) + " - " +  dateToString(item.endAt)} img={`${eventPosterURL}${item.image}`} onOpen={()=>openEventModal(item.id)} />
          ))
        }
        {isEventModalOpen && <EventDetailModal onClose={() => CloseEventModal()} evnetId={propEventId} />}
      </div>
      {/* EXHIBITION */}
      <div className={titleStyle}>
        <img src={exhiIcon} alt="전시회 아이콘" className={titleImgStyle} />
        <h1 className={textStyle}>전시회 둘러보기</h1>
        <span className="w-[80%] text-right text-[#5464f1] cursor-pointer" onClick={handleModalToggle}>지도로 보기</span>
      </div>
      {isModalOpen && <MapModal onClose={handleModalToggle} />}
      <div>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
          {currentItems.map((item, index) => (
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
