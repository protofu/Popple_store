import { useEffect, useState } from "react";
import { reservationAPI } from "../api/services/Reservation";
import { useParams } from "react-router-dom";
import moment from "moment";

export default function ReserveCheck() {
  const { id } = useParams();  
  const [message, setMessage] = useState("QR코드 확인중...");
  const checkQR = async () => {
    try {
      const response = await reservationAPI.check(id);
      if (response.status === 200) {
        const reserverName = response.data.reserverName;
        const email = response.data.email;
        const date = moment(new Date(response.data.reserveTime[0], response.data.reserveTime[1] - 1, response.data.reserveTime[2])).format('YYYY년 MM월 DD일');
        setMessage("예약자: " + reserverName + "\n이메일: " + email + "\n예약일: " + date);
      }
    } catch (error) {
      console.error(error);
      setMessage("잘못된 예약으로, QR코드 확인에 실패했습니다.");
    }
  };
  useEffect(() => {
    checkQR();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full mt-[30px] whitespace-pre-wrap">
      {message}
    </div>
  );
};
