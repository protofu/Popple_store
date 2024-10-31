import { useEffect } from "react";
import { eventAPI } from "../../api/services/Event";
import { useParams } from "react-router-dom";

export default function DetailsEvent() {
  const { id } = useParams();

  useEffect(() => {
    const getEvents = async () => {
      const res = await eventAPI.getExhibitionEvents(id);
      console.log(res.data);
    };

    getEvents();
  }, [])
  
  return (
    <div>
      디테일의 이벤트 페이지
    </div>
  );
};
