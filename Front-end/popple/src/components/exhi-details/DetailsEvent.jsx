import { useEffect, useState } from "react";
import { eventAPI } from "../../api/services/Event";
import { useNavigate, useParams } from "react-router-dom";
import EventCard from "../EventCard";
import NoEventList from "../event/NoEventList";
import EventDetailModal from "../event/EventDetailModal";
import { useLoginUserStore } from "../../stores/LoginUserState";
import EventCardV2 from "../exhibition/EventCardV2";

export default function DetailsEvent({ navigate, usernickname, loginusernickname }) {
  const eventPosterURL = import.meta.env.VITE_EVENT_POSTER;
  const { id } = useParams();

  // 팝업 관련 이벤트 가져오기
  const [eventList, setEventList] = useState([]);
  const getEvents = async () => {
    const res = await eventAPI.getExhibitionEvents(id);
    console.log(res.data);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const filtered = res.data.filter(item => {
      const endAt = new Date(item.endAt[0], item.endAt[1] - 1, item.endAt[2]);
      endAt.setHours(0, 0, 0, 0);
      return endAt > yesterday; 
    });
    setEventList(filtered);
  };

  useEffect(() => {
    getEvents();
  }, [])
//
  useEffect(() => {
    console.log("eventList 상태 변화:", eventList);
  }, [eventList]);
//
  const [propEventId, setPropEventId] = useState(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  // 이벤트 모달 오픈
  const openEventModal = (id) => {
    setPropEventId(id);
    setIsEventModalOpen(true);
  };

  // 이벤트 모달 닫기
  const CloseEventModal = () => {
    setIsEventModalOpen(false);
  };
  
  function dateToString(arr) {
    const [y,m,d] = arr;
    return y+"."+m+"."+d;
  }
  
  const h1Style = "font-bold text-[1.25rem]";

  return (
    <div className="flex flex-col gap-8 mb-[2rem] mx-12 mt-12 ">
      <div>
        <h1 className={h1Style}>EVENT</h1>
      </div>
      <div className="flex flex-wrap gap-4 mx-4">
        {eventList?.length > 0 ?
          eventList.map((item, index) => (
            
            <EventCardV2 
              key={index} 
              slogun={item.eventName} 
              title={item.summary} 
              duration={dateToString(item.startAt) + " ~ " + dateToString(item.endAt)} 
              img={`${eventPosterURL}${item.image}`} 
              onOpen={() => openEventModal(item.id)} 
              id={item.id}
              description={item.description} 
              exhibitionTitle={item.exhibition.exhibitionName}
              exhibitionId={item.exhibition.id}
              exhiTypeId={item.exhibition.type.id}
              />
          )) :
          <NoEventList text={"이벤트"}/>
        }
        {isEventModalOpen && <EventDetailModal onClose={() => CloseEventModal()} evnetId={propEventId} />}
      </div>
      {loginusernickname === usernickname && (
         <button className="m-6 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-popple to-pink-500 group-hover:from-popple group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-popple-dark w-48"
         onClick={()=>navigate(`/event-regist?id=${id}`)}>
           <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
             이벤트 등록
           </span>
       </button>
      )}
     
    </div>
  );
};
