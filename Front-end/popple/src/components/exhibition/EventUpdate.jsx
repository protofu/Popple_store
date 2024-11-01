import { useEffect, useState } from "react";
import FileCarousel from "../../components/exhibition/FileCarousel";
import { eventAPI } from "../../api/services/Event";
import Markdown from "../common/Markdown";
import EventForm from "./EventForm";
import { useNavigate } from "react-router-dom";
import moment from "moment";
export default function EventUpdate() {
  // param으로 넘겨서
  const queryParams = new URLSearchParams(location.search);
  // key값이 id 인 것의 value값을 가져옴
  const evId = queryParams.get("id");

  const [eventData, setEventData] = useState({});
  const navigate = useNavigate();

  //이벤트 정보 가져오자
  const handleGet = async () => {
    try {
      const res = await eventAPI.getEvent(evId);
      if (res.status === 200) {
        const {
          eventName,
          summary,
          description,
          startAt,
          endAt,
          image,
        } = res.data;
        console.log("레데", res.data)
        setEventData({
          eventName: eventName,
          summary: summary,
          description: description,
          startAt: moment(startAt).format('YYYY-MM-DD'),
          endAt: moment(endAt).format('YYYY-MM-DD'),
          eventPoster:image,
        });
      }
    } catch (error) {}
  };

  //가져온 이벤트 정보 뿌리기
  useEffect(() => {
    handleGet();
  }, []);

  useEffect(() => {
    if (Object.keys(eventData).length > 0) {
      setInfo((prev) => ({
        ...prev,
        ...eventData, // 가져온 데이터를 info에 반영
      }));
    }
  }, [eventData]);

  //입력 정보
  const [info, setInfo] = useState({
    eventImage: [],
    eventPoster: "",
    summary: "",
    exId: evId,
    description: "",
    eventName: "",
    startAt: "",
    endAt: "",
  });

  //수정 핸들러
  const handleSubmit = async (event) => {
    try {
      event.preventDefault(); // 기본 폼 제출 방지
      const formData = new FormData();

      // 포스터 파일 추가
      if (info.eventPoster) {
        formData.append("eventPoster", info.eventPoster);
      }
      // 이미지 파일 추가
      if (info.eventImage) {
        info.eventImage.forEach((img, index) => {
          formData.append(`eventImage`, img);
        });
      }
      formData.append("exId", Number(info.exId));
      formData.append("startAt", info.startAt);
      formData.append("endAt", info.endAt);
      formData.append("description", info.description);
      formData.append("summary", info.summary);
      formData.append("eventName", info.eventName);

      const res = await eventAPI.update(formData);
      if (res.status === 200 || res.status === 204) {
        alert("이벤트가 수정되었습니다.");
        navigate("/event");
      }
    } catch (error) {
      alert("이벤트 수정에 실패하였습니다.");
    }
    setInfo({});
  };
  
  return (
    <EventForm title={"이벤트 수정"} info={info} setInfo={setInfo} handleSubmit={handleSubmit} />
  );
}
