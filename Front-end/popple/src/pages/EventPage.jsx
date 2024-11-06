import { useEffect, useReducer, useState } from "react";
import { eventAPI } from "../api/services/Event";
import ExStepComplete from "../components/exhibition/ExStepComplete";
import EventCardV2 from "../components/exhibition/EventCardV2";
function dateToString(arr) {
  const [y,m,d] = arr;
  return y+"."+m+"."+d;
}
function reducer(state, action){
  
  if(action.type === "getList"){
    return action.value;
  }else if(action.type === "deleteEvent"){
    return state.filter(e => e.id != action.value)
  }
  throw Error("Unknown action. ");
}
  


export default function EventPage() {
  const eventPosterURL = import.meta.env.VITE_EVENT_POSTER;
  const textStyle = "text-[28px] ml-3 font-bold mt-5";
  // const [eventList, setEventList] = useState([])
  const [state, dispatch] = useReducer(reducer, []);
  
  function isEventAfterYesterday(endAt) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const eventEndDate = new Date(endAt[0], endAt[1] - 1, endAt[2]);
    eventEndDate.setHours(0, 0, 0, 0); 
    return eventEndDate > yesterday; 
  }

  //추가될 때마다 
  useEffect(() => {
    //저장된 이벤트 가져오기
    const getEvent = async() => {
      try {
        const res = await eventAPI.getAll();
        const filteredEvents = res.data.filter((event) => isEventAfterYesterday(event.endAt));
        dispatch({ type: "getList", value: filteredEvents});
        
      } catch (error) {
        console.error(error)
      }
    }
    getEvent();
  }, []);
  console.log(state)
  return (
    <>
      <h1 className={textStyle}>Event</h1>
      <hr className="mt-2 mb-0 border-gray-500" />
      <div className="mt-10">
        <h1 className="text-center text-2xl mb-5">EVENT</h1>
        {/* <ExStepComplete exhiId={exhiId}/> */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center ">
          {state.map((item, index) => (
              <EventCardV2 
                dispatch={dispatch} 
                evId={item.id} 
                key={index} 
                description={item.description} 
                slogun={item.summary} 
                title={item.eventName}
                usernickname={item.exhibition.user.nickname}
                duration={dateToString(item.startAt) + " ~ "+ dateToString(item.endAt)} 
                img={`${eventPosterURL}${item.image}`}
                exhibitionId={item.exhibition.id}
                exhibitionTitle={item.exhibition.exhibitionName}
                exhiTypeId={item.exhibition.type.id} 
              />
          ))}
        </div>
      </div>
    </>
  );
};
