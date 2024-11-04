import { useEffect, useState } from "react";
import { eventAPI } from "../../api/services/Event";
import { useParams } from "react-router-dom";
import EventCard from "../EventCard";
import NoEventList from "../event/NoEventList";
import EventDetailModal from "../event/EventDetailModal";

export default function DetailsEvent() {
  const eventPosterURL = import.meta.env.VITE_EVENT_POSTER;
  
  const { id } = useParams();

  // 팝업 관련 이벤트 가져오기
  const [eventList, setEventList] = useState([]);
  const getEvents = async () => {
    const res = await eventAPI.getExhibitionEvents(id);
    console.log(res.data);
    const today = new Date(); // 오늘 날짜 가져오기
    const filtered = res.data.filter(item => {
        const endAt = new Date(item.endAt); // endAt을 Date 객체로 변환
        return endAt > today; // 오늘보다 후인지 확인
    });
    setEventList(filtered);
  };

  useEffect(() => {

    getEvents();
  }, [])

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
    <div className="flex flex-col gap-8 mb-[2rem] mx-12 mt-12">
      <div>
        <h1 className={h1Style}>EVENT</h1>
      </div>
      <div className="flex flex-wrap gap-4">
        {eventList?.length > 0 ?
          eventList.map((item, index) => (
            <EventCard key={index} slogun={item.eventName} title={item.summary} duration={dateToString(item.startAt) + " - " + dateToString(item.endAt)} img={`${eventPosterURL}${item.image}`} onOpen={() => openEventModal(item.id)} id={item.id} />
          )) :
          <NoEventList />
        }
        {isEventModalOpen && <EventDetailModal onClose={() => CloseEventModal()} evnetId={propEventId} />}
      </div>
    </div>
  );
};
