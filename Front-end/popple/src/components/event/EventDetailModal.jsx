import { useNavigate } from "react-router-dom";
import { eventAPI } from "../../api/services/Event";
import { useLoginUserStore } from "../../stores/LoginUserState";
import { useEffect, useState } from "react";

export default function EventDetailModal({ onClose, evnetId }) {

  const eventImageURL = import.meta.env.VITE_EVENT_IMAGE;

  const { loginUserNickname } = useLoginUserStore();
  const navigate = useNavigate();

  //이벤트 삭제 핸들러
  const handleDelete = async () => {
    try {
      await eventAPI.delete(evnetId);
      alert("삭제 완료");
    } catch (error) {
      alert("삭제 불가");
    }
  };

  // 이벤트 디테일 가져오기
  const [eventDetail, setEventDetail] = useState(null);
  const getEventDetail = async () => {
    const res = await eventAPI.getEvent(evnetId);
    setEventDetail(res.data);
  };

  const handleNavi = () => {
    navigate(`/event-update?id=${eventDetail.evId}`);
  };

  function dateToString(arr) {
    const [y,m,d] = arr;
    return y+"."+m+"."+d;
  }

  useEffect(() => {
    getEventDetail();
    
  }, []);

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 overflow-auto"
    >
      <div className="flex flex-col justify-evenly items-center bg-white rounded-lg p-5 w-[40%] h-auto">
        {eventDetail ? (
          <>
            <div className="grid grid-cols-3 w-full text-2xl font-bold border-b-2 pb-2 mb-2">
              <div className="inline"><span className="cursor-pointer" onClick={onClose}>X</span></div>
              <span className="text-center">{eventDetail.eventName}</span>
              <span className="mt-auto text-right text-sm text-[#a4a4a4]">
                {dateToString(eventDetail.startAt) + " - " + dateToString(eventDetail.endAt)}
              </span>
            </div>
  
            <div className="relative flex rounded-[12px] overflow-hidden aspect-auto w-full h-[90%] max-w-[345px] bg-black">
              <img src={`${eventImageURL}${eventDetail.image}`} className="object-cover" />
            </div>
            <div className="mt-8">
              {eventDetail.description && eventDetail.description}
            </div>
  
            <div className="w-full mt-20">
              {loginUserNickname === eventDetail.exhibition.user.nickname && (
                <div className="flex justify-around">
                  <button className="border rounded-lg p-2" onClick={handleNavi}>
                    수정
                  </button>
                  <span></span>
                  <button
                    className="border rounded-lg p-2"
                    onClick={handleDelete}
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
  
}