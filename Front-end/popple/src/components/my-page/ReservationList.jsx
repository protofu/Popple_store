import React, { useEffect, useState } from "react"; 
import { reservationAPI } from "../../../src/api/services/Reservation";
import moment from "moment";
export default function ReservationList() {

  const [reservations, setReservations] = useState([]);
  const [pastReservations, setPastReservations] = useState([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [reservationIdToCancel, setReservationIdToCancel] = useState(null);

  const handleCancel = (id) => {
    setReservationIdToCancel(id);
    setShowCancelModal(true);
  };


  //ex
  const exData = [
    {
      id: 1,
      exhibitionName: "현대 미술전",
      address: "서울시 강남구",
      reservationDate: "2024-10-30T14:30:00Z"
    },
    {
      id: 2,
      exhibitionName: "전통 문화전",
      address: "부산시 해운대구",
      reservationDate: "2024-10-31T10:15:00Z"
    },
    {
      id: 3,
      exhibitionName: "과학 전시회",
      address: "대구시 중구",
      reservationDate: "2023-10-28T16:00:00Z"
    }
  ];

  // 날짜 포맷 변환 함수
  const formatDate = (dateString) => {
    return moment(dateString).format('YYYY-MM-DD HH:mm');
  };

  // 예약 목록 가져오기
  const getMyReservationList = async () => {
    const res = await reservationAPI.getList();
    console.log("API 응답:", res);
    setReservations(Array.isArray(res) ? res : []);

    // ex용 --> ex 없으면 지워!!!!!!!
    const data = Array.isArray(res) && res.length > 0 ? res : exData;

    // 현재 시간에 따라서 나누기
    const current=[];
    const past=[];
    const currentDate = new Date();

    //if (Array.isArray(res)) { //이부분은 ex없애면 풀고 !!!
      // ex용 지우면 data를 res로 변경!!!!
      data.forEach(reservation => { 
        const reservationDate = new Date(reservation.reservationDate);
        if (reservationDate >= currentDate) {
          current.push(reservation);
        } else {
          past.push(reservation);
        }
      });
    //}

  setReservations(current);
  setPastReservations(past);
}

  useEffect(() => {
    getMyReservationList();
  }, []);

  const CancelModal = ({ reservationId, onClose }) => {
    const [password, setPassword] = useState("");
  
    const handleConfirm = async () => {
      try {
        await reservationAPI.cancel(reservationId, { password });
        getMyReservationList();
        onClose();
      } catch (error) {
        console.error("취소 실패:", error);
      }
    };

    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="flex flex-col justify-center items-center bg-white rounded-xl p-5 w-[400px] h-[250px] gap-5 border-2 border-[#8900E1] relative">
          <button className="absolute top-2 right-2 text-[#8900E1] text-xl p-2" onClick={onClose}>
            ✖
          </button>
          <div className="mt-10">
            <h1 className="text-[20px] text-center">예약을 취소하시겠습니까?</h1>
            <h1 className="text-[20px] text-center">계정 비밀번호를 입력해주세요.</h1>
          </div>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="border border-[#ccc] rounded-[8px] focus:border-[#8900E1] focus:border-2 focus:outline-none w-full p-2"
          />
          <div className="flex justify-center w-full">
            <button className="bg-[#8900E1] text-white px-4 py-2 rounded" onClick={handleConfirm}>
              확인
            </button>
          </div>
        </div>
      </div>
    );
    
  };

  return (
    <div>
      <div className="pb-12 mb-12">
        <h2 className="text-[18px]">예약 목록</h2>
        <hr  className=" border-gray-500"/>
        <table className="w-full mt-3 text-left">
          <thead  >
            <tr >
              <th className="border-b pl-5 w-1/5 pb-3">팝업/전시명</th>
              <th className="border-b w-2/5 pb-3">주소</th>
              <th className="border-b w-1/5 pb-3">예약일</th>
              <th className="border-b w-1/5 pb-3"></th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">예약 내역이 없습니다.</td>
              </tr>
            ) : (
              reservations.map(reservation => (
                <tr key={reservation.id}>
                  <td className="border-b pl-5">{reservation.exhibitionName}</td>
                  <td className="border-b">{reservation.address}</td>
                  <td className="border-b">{formatDate(reservation.reservationDate)}</td>
                  <td className="border-b">
                    <button className="border border-red-500 text-red-500 px-1 py-0.5 rounded-lg mt-1 mb-1"
                            onClick={()=> handleCancel(reservation.id)}>
                      예약 취소
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showCancelModal && (
        <CancelModal 
          reservationId={reservationIdToCancel} 
          onClose={() => setShowCancelModal(false)} 
        />
      )}
      <div className="mt-8">
        <h2 className="text-[18px]">지난 예약 목록</h2>
        <hr  className=" border-gray-500"/>
        <table className="w-full mt-3 text-left">
          <thead  >
            <tr >
            <th className="border-b pl-5 w-1/5 pb-3">팝업/전시명</th>
              <th className="border-b w-2/5 pb-3">주소</th>
              <th className="border-b w-2/5 pb-3">예약일</th>
             
            </tr>
          </thead>
          <tbody>
            {pastReservations.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">지난 예약 내역이 없습니다.</td>
              </tr>
            ) : (
              pastReservations.map(reservation => (
                <tr key={reservation.id}>
                  <td className="border-b pl-5 py-2">{reservation.exhibitionName}</td>
                  <td className="border-b">{reservation.address}</td>
                  <td className="border-b">{formatDate(reservation.reservationDate)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};