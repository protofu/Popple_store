import { useEffect, useState } from "react";
import { CiSquareChevDown, CiSquareChevUp } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { eventAPI } from "../api/services/Event";
import { exhibitionAPI } from "../api/services/Exhibition";
import EventDetailModal from "../components/event/EventDetailModal";
import NoEventList from "../components/event/NoEventList";
import EventCard from "../components/EventCard";
import PostCard from "../components/poster-card/PostCard";
import EventCardV2 from "../components/exhibition/EventCardV2";

export default function MainPage() {
  const postURL = import.meta.env.VITE_EXHIBITION_POSTER;
  const eventPosterURL = import.meta.env.VITE_EVENT_POSTER;
  // 초기 상태는 팝업(true)을 보여주도록 설정
  const [isPop, setIsPop] = useState(1);
  // 팝업/전시 배열
  const [exData, setExData] = useState([]);

  const navigate = useNavigate(); 

  const handleNavigate = (path) => {
    navigate(path);
  };

  //  팝업 -> 전시 클릭시 상태 변환 메서드 (확장성이 너무 안좋음)
  const handlePopToEx = () => {
    setIsPop(2);
  };
  //  전시 -> 팝업 클릭시 상태 변환 메서드
  const handleExToPop = () => {
    setIsPop(1);
  };

  // 팝업 관련 이벤트 가져오기
  const [eventList, setEventList] = useState([]);
  const getEvents = async () => {
    const res = await eventAPI.getAll();
    const today = new Date(); // 오늘 날짜 가져오기
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const filtered = res.data.filter(item => {
        const endAt = new Date(item.endAt); // endAt을 Date 객체로 변환
        endAt.setHours(0, 0, 0, 0);
        return endAt > yesterday; 
    });
    setEventList(filtered);
  };

  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = exData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(exData.length / itemsPerPage);

  // 페이지 변경 함수
  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  // 팝업/전시 입력에 따른 목록 보여주기
  const getExhibitionByType = async () => {
    const res = await exhibitionAPI.getlist(isPop);
    const today = new Date(); // 오늘 날짜 가져오기
    // 종료된것은 제외
    const filtered = res.data.filter(item => {
        const endAt = new Date(item.endAt); // endAt을 Date 객체로 변환
        return endAt > today; // 오늘보다 후인지 확인
    });
    setExData(filtered);
  };
  const eventImageURL = import.meta.env.VITE_EVENT_IMAGE;
  useEffect(() => {
    getEvents();
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

    getExhibitionByType();
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage); // 리사이즈 이벤트 리스너 추가

    return () => {
      window.removeEventListener("resize", updateItemsPerPage); // 컴포넌트 언마운트 시 리스너 제거
    };
  }, [isPop])
 
  return (
    <div className="flex flex-col items-center">
      {/* 메인 이미지 */}
      <div className="flex w-full relative items-center">
        <div className="absolute z-50 right-0 flex flex-col gap-6 mr-3">
          <button className="arrow-up cursor-pointer text-4xl z-50"><CiSquareChevUp /></button>
          <button className="arrow-down cursor-pointer text-4xl z-50"><CiSquareChevDown /></button>
        </div>
        <div className="my-auto w-full">
          {/* <PostCarousel /> */}
          <Swiper
            className="w-full h-[40vh] block"
            direction="vertical"
            loop={true}
            autoplay={{ delay: 2000 }}
            speed={1000}
            effect="coverflow"
            coverflowEffect={{rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true}}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{ prevEl: ".arrow-up", nextEl:".arrow-down" }}
            modules={[Autoplay, EffectCoverflow, Navigation]}
          >
            <SwiperSlide className="cursor-pointer">
              <div className="h-full bg-gradient-to-b from-popple-light to-popple-dark">A 내용</div>            
            </SwiperSlide>
            <SwiperSlide className="cursor-pointer">
            <div className="h-full bg-gradient-to-b from-popple to-purple-300">A 내용</div>  
            </SwiperSlide>
            <SwiperSlide className="cursor-pointer">
            <div className="h-full bg-gradient-to-b from-purple-400 to-purple-200">A 내용</div>  
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      
      {/* 이벤트 섹션 */}
      <div className="mt-10">
        <h1 className="text-center text-2xl mb-5 cursor-pointer" onClick={() => handleNavigate("/event")}>EVENT</h1>
        <div className="flex flex-wrap justify-center gap-4 mx-4">
          {eventList?.length > 0 ?
            eventList.slice(0, 8).map((item, index) => (
              <EventCardV2 
              key={index} 
              slogun={item.eventName} 
              title={item.summary} 
              duration={dateToString(item.startAt) + " ~ " + dateToString(item.endAt)} 
              eventPoster={`${eventPosterURL}${item.eventPoster}`} 
              eventImages={item.eventImage?.map(image => `${eventImageURL}${image}`)}
              onOpen={() => openEventModal(item.id)} 
              id={item.id}
              description={item.description} 
              exhibitionTitle={item.exhibition.exhibitionName}
              exhibitionId={item.exhibition.id}
              exhiTypeId={item.exhibition.type.id}
              usernickname={item.exhibition.user.nickname}
              />            )) :
            <NoEventList />
          }
          {isEventModalOpen && <EventDetailModal onClose={() => CloseEventModal()} evnetId={propEventId} />}
        </div>
      </div>
      {/* 전시 혹은 이벤트 섹션 */}
      <div className="mt-10">
        <div className="text-center text-2xl mb-5">
        {isPop == 1 ? (
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
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
          {currentItems.map((item, index) => (
            <PostCard key={index} id={item.id} img={`${postURL}${item.savedImage}`} title={item.exhibitionName} addr={item.address} duration={dateToString(item.startAt) + " - " + dateToString(item.endAt)} styles={"w-full h-auto"} typeId={isPop}/>
          ))}
        </div>
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


function dateToString(arr) {
  const [y,m,d] = arr;
  return y+"."+m+"."+d;
}
