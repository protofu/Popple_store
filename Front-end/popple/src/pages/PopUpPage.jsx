
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
import { exhibitionAPI } from "../api/services/Exhibition";
import MapModal from "../components/map-view/MapModal";
import { eventAPI } from "../api/services/Event";
import EventDetailModal from "../components/event/EventDetailModal";
import NoEventList from "../components/event/NoEventList";
import EventCardV2 from "../components/exhibition/EventCardV2";

function dateToString(arr) {
  const [y,m,d] = arr;
  return y+"."+m+"."+d;
}

export default function PopUpPage() {
  const posterURL = import.meta.env.VITE_EXHIBITION_POSTER;
  const eventPosterURL = import.meta.env.VITE_EVENT_POSTER;

  const type = 1; // 팝업 1번

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [popupData, setPopupData] = useState([]);
  const [visitCountData, setVisitCountData] = useState([]);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

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

  // 현재 페이지에 따라 아이템 인덱스 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = popupData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(popupData.length / itemsPerPage);

  
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
    const getPopupList = async () => {
      try {
        // 인기 있는 팝업은 visitCount와 like 개수와 review 개수를 합산하여 가져온다.
        const res = await exhibitionAPI.getPopularList(type);
        console.log(res.data);
        setPopupData(res.data); // 상태에 필터링된 데이터 설정
        const visitCountRes = res.data.sort((a, b) => b.visitCount - a.visitCount);
        setVisitCountData(visitCountRes);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    };
    getEvents();
    getPopupList();

    updateItemsPerPage(); // 컴포넌트가 마운트될 때 실행
    window.addEventListener("resize", updateItemsPerPage); // 리사이즈 이벤트 리스너 추가

    return () => {
      window.removeEventListener("resize", updateItemsPerPage); // 컴포넌트 언마운트 시 리스너 제거
    };
  }, []);

  const titleStyle = "flex items-center w-full mt-10 mb-5 ml-0";
  const textStyle = "text-2xl ml-2 font-bold whitespace-nowrap";
  const titleImgStyle = "inline w-[2.5rem]";

  return (
    <div className="w-full mx-auto mt-4">
      {/* 조회수 기준으로 캐러셀 표현 */}
      <div>
        <h1 className={textStyle}>가장 많이 본 POP-UP</h1>
        <PostCarousel items={visitCountData.slice(0,10)} max={10} />
      </div>
      {/* 인기있는 POP-UP - {인기테이블을 어떻게 할지?} */}
      <div className={titleStyle}> 
        <img src={popularIcon} alt="인기 아이콘" className={titleImgStyle} />
        <h1 className={textStyle}>인기있는 POP-UP</h1>
      </div>
      <PosterSlide items={popupData.slice(0, 10)}/>

      {/* EVENT */}
      <div className={titleStyle}>
        <img src={eventIcon} alt="이벤트 아이콘" className={titleImgStyle} />
        <h1 className={textStyle}>EVENT</h1>
      </div>
      <div className="flex flex-wrap gap-4 mx-4">
        {eventList?.length > 0 ?
          eventList.slice(0, 8).map((item, index) => (
            <EventCardV2 key={index} slogun={item.eventName} title={item.summary} duration={dateToString(item.startAt) + " - " + dateToString(item.endAt)} img={`${eventPosterURL}${item.image}`} onOpen={() => openEventModal(item.id)} id={item.id} />
          )) :
          <NoEventList text={"이벤트"} />
        }
        {/* onClose, eventDetail, dispatch */}
        {isEventModalOpen && <EventDetailModal onClose={() => CloseEventModal()} evnetId={propEventId} />}
      </div>
      {/* POP-UP */}
      <div className={titleStyle}>
        <img src={popupIcon} alt="팝업 아이콘" className={titleImgStyle} />
        <h1 className={textStyle}>POP-UP 둘러보기</h1>
        <span className="w-[80%] text-right text-[#5464f1]" onClick={handleModalToggle}>지도로 보기</span>
      </div>
      {isModalOpen && <MapModal onClose={handleModalToggle} />}
      <div>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
          {currentItems.map((item, index) => (
            <PostCard
              key={index}
              id={item.id}
              img={item.savedImage !== null ? `${posterURL}${item.savedImage}` : "/waiting_for_Image.png"} 
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
                currentPage === index + 1 ? "bg-popple-light text-white" : "bg-white text-black"
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
