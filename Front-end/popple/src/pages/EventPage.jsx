import { useEffect, useState } from "react";
import { eventAPI } from "../api/services/Event";
import EventCard from "../components/EventCard";
import { data } from "autoprefixer";
import ExStepComplete from "../components/exhibition/ExStepComplete";
import EventCardV2 from "../components/exhibition/EventCardV2";

export default function EventPage() {
  const textStyle = "text-[28px] ml-3 font-bold mt-5";
  const [eventList, setEventList] = useState([])

  const exhiId = 1;
  //저장된 이벤트 가져오기
  const getEvent = async() => {
    try {
      const res = await eventAPI.getAll();
      console.log("데이터", res.data);
      setEventList(res.data);
    } catch (error) {
      console.error(error)
    }
  }

  //추가될 때마다 
  useEffect(() => {
    getEvent();
  }, [setEventList]);

  

  return (
    <>
      <h1 className={textStyle}>Event</h1>
      <hr className="mt-2 mb-0 border-gray-500" />
      <div className="mt-10">
        <h1 className="text-center text-2xl mb-5">EVENT</h1>
        <ExStepComplete exhiId={exhiId}/>
        
        <div className="flex flex-wrap justify-center gap-10">
          {eventList.map((item, index) => (
              <EventCardV2 key={index} slogun={item.summary} title={item.eventName} duration={item.startAt + " ~ "+ item.endAt} img={`http://localhost:8080/event_poster_image/${item.image}`}/>
          ))}
        </div>
      </div>
    </>
  );
};
