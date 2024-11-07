import React, { useEffect, useState } from "react"; 
import { reservationAPI } from "../../../src/api/services/Reservation";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../api/services/Auth";
import { poppleAlert } from "../../utils/PoppleAlert";
export default function ReservationList() {

  const [reservations, setReservations] = useState([]);
  const [pastReservations, setPastReservations] = useState([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [reservationIdToCancel, setReservationIdToCancel] = useState(null);
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const handleCancel = (id) => {
    setReservationIdToCancel(id);
    setShowCancelModal(true);
  };

  const handleRowClick = (exhibitionId, exhiTypeId) => {
    if (exhiTypeId === 1) {
      navigate(`/pop-up/detail/${exhibitionId}`);
    } else if (exhiTypeId === 2) {
      navigate(`/exhibition/detail/${exhibitionId}`);
    }
  };

  // 날짜 포맷 변환 함수
  const formatDate = (dateArray) => {
    const [year, month, day, hour, minute, second] = dateArray;
    return moment([year, month - 1, day]).format('YYYY-MM-DD');
  };

  // 예약 목록 가져오기
  const getMyReservationList = async () => {
    const res = await reservationAPI.getList();

    // 현재 시간에 따라서 나누기
    const current=[];
    const past=[];
    const currentDate = new Date();
    const formattedToday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()); // 현재 날짜로만 변환



    if (Array.isArray(res.data)) { 
      // ex용 지우면 data를 res로 변경!!!!
      res.data.forEach(reservation => { 
        const reservationDateArray = reservation.reservationDate; // 예: [2024, 10, 31]
      const reservationDate = new Date(reservationDateArray[0], reservationDateArray[1] - 1, reservationDateArray[2]); // 배열을 Date 객체로 변환
        if (reservationDate >= formattedToday) {
          current.push(reservation);
        } else {
          past.push(reservation);
        }
      });
    }
  current.sort((a, b) => new Date(a.reservationDate) - new Date(b.reservationDate));
  past.sort((a, b) => new Date(b.reservationDate) - new Date(a.reservationDate));
  setReservations(current);
  setPastReservations(past);
};

  useEffect(() => {
    getMyReservationList();
  }, []);

  const CancelModal = ({ reservationId, onClose }) => {
    const handleCancelReservation = async () => {
      try {
        await reservationAPI.cancel(reservationId);
        await poppleAlert.alert("", "예약이 취소되었습니다.");
        onClose();
        getMyReservationList();
      } catch (error) {
        console.error("예약 취소 실패:", error.response ? error.response.data : error);
      }
    };
  
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="flex flex-col justify-center items-center bg-white rounded-xl p-5 w-[400px] h-[200px] gap-5 border-2 border-[#8900E1] relative">
          <button className="absolute top-2 right-2 text-[#8900E1] text-xl p-2" onClick={onClose}>
            ✖
          </button>
          <h1 className="text-[20px] text-center mt-10">해당 예약을 취소하시겠습니까?</h1>
          <div className="flex justify-center w-full mt-5">
            <button 
              className="bg-[#8900E1] text-white mt-1 px-4 py-2 rounded" 
              onClick={handleCancelReservation}
            >
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
              <th className="border-b pl-5 w-3/8 pb-3">팝업/전시명</th>
              <th className="border-b w-3/8 pb-3">주소</th>
              <th className="border-b w-1/8 pb-3">예약일</th>
              <th className="border-b w-1/8 pb-3"></th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <tr>
                <td colSpan="4" className="pt-3 pl-5">예약 내역이 없습니다.</td>
              </tr>
            ) : (
              reservations.map(reservation => (
                <tr key={reservation.id} onClick={() => handleRowClick(reservation.exhibitionId , reservation.exhiTypeId)} // 행 클릭 시 디테일 페이지 이동
                className="cursor-pointer hover:bg-gray-100"
              >
                  <td className="border-b pl-5">{reservation.exhibitionName}</td>
                  <td className="border-b">{reservation.address}</td>
                  <td className="border-b">{formatDate(reservation.reservationDate)}</td>
                  <td className="border-b">
                    <button className="border border-red-500 text-red-500 px-1 py-0.5 rounded-lg mt-1 mb-1"
                            onClick={(e)=>{ e.stopPropagation(); handleCancel(reservation.id);}}>
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
          onClose={() => {
            setShowCancelModal(false)
            setErrorMessage("");
          }
          }
        />
      )}
      <div className="mt-8 pb-12 mb-12">
        <h2 className="text-[18px]">지난 예약 목록</h2>
        <hr  className=" border-gray-500"/>
        <table className="w-full mt-3 text-left">
          <thead  >
            <tr >
              <th className="border-b pl-5 w-1/4 pb-3">팝업/전시명</th>
              <th className="border-b w-1/2 pb-3 pl-8">주소</th>
              <th className="border-b w-1/4 pb-3">예약일</th>
            </tr>
          </thead>
          <tbody>
            {pastReservations.length === 0 ? (
              <tr>
                <td colSpan="4" className="pt-3 pl-5">지난 예약 내역이 없습니다.</td>
              </tr>
            ) : (
              pastReservations.map(reservation => (
                <tr key={reservation.id} onClick={() => handleRowClick(reservation.exhibitionId
                )} // 행 클릭 시 디테일 페이지 이동
                className="cursor-pointer hover:bg-gray-100"
              >
                  <td className="border-b pl-5 pt-2 pb-2 ">{reservation.exhibitionName}</td>
                  <td className="border-b pl-8">{reservation.address}</td>
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