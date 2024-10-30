import { useEffect } from "react";
import { reservationAPI } from "../../api/services/Reservation";

export default function ReservationList() {
  // 예약 목록 가져오기
  const getMyReservationList = async () => {
    const res = await reservationAPI.getList();
    console.log(res);
  }

  // 컴포넌트가 렌더링될 때 예약한 목록을 가져옴
  useEffect(() => {
    getMyReservationList();
  }, []);
  return (
    <div>
      예약 목록 관련 내용 (일반 사용자)
    </div>
  );
};
