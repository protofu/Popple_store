import { useState } from "react";
import { LuFilePlus } from "react-icons/lu";
import FileCarousel from "../components/exhibition/FileCarousel";
import { eventAPI } from "../api/services/Event";
import { useNavigate } from "react-router-dom";
import Markdown from "../components/common/Markdown";
import { poppleAlert } from "../utils/PoppleAlert";
import EventForm from "../components/exhibition/EventForm";

export default function EventRegister() {
  // param으로 넘겨서
  const queryParams = new URLSearchParams(location.search);
  // key값이 id 인 것의 value값을 가져옴
  const exhibitionId = queryParams.get("id");

  const navigate = useNavigate();

  //입력 정보
  const [info, setInfo] = useState({
    eventImage: [],
    eventPoster: "",
    summary: "",
    exId: exhibitionId,
    description: "",
    eventName: "",
    startAt: "",
    endAt: "",
  });

  //등록 핸들러
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
      formData.append("exId", info.exId);
      formData.append("startAt", info.startAt);
      formData.append("endAt", info.endAt);
      formData.append("description", info.description);
      formData.append("summary", info.summary);
      formData.append("eventName", info.eventName);

      const res = await eventAPI.regist(formData);
      if (res.status === 201) {
        poppleAlert.alert("이벤트가 등록되었습니다.");
        navigate("/");
      }
    } catch (error) {
      poppleAlert.alert("이벤트 등록에 실패하였습니다.");
      console.error(error, error.message)
    }
  };

  return (
    <EventForm title={"이벤트 등록"} info={info} setInfo={setInfo} handleSubmit={handleSubmit} />
  );
}
