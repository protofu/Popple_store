import React, { useEffect, useState } from "react"; 
import { reservationAPI } from "../../../src/api/services/Reservation";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../api/services/Auth";
export default function ReservationList() {

  const [reservations, setReservations] = useState([]);
  const [pastReservations, setPastReservations] = useState([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [reservationIdToCancel, setReservationIdToCancel] = useState(null);
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태 추가
const [successMessage, setSuccessMessage] = useState(""); // 성공 메시지 상태 추가


  const handleCancel = (id) => {
    setReservationIdToCancel(id);
    setShowCancelModal(true);
  };

  const handleRowClick = (exhibitionId) => {
    navigate(`/pop-up/detail/${exhibitionId}`); // 디테일 페이지로 이동
  };

  // 날짜 포맷 변환 함수
  const formatDate = (dateArray) => {
    const [year, month, day, hour, minute, second] = dateArray;
    return moment([year, month - 1, day]).format('YYYY-MM-DD');
  };

  // 예약 목록 가져오기
  const getMyReservationList = async () => {
    const res = await reservationAPI.getList();
    console.log("API 응답:", res);
    // setReservations(Array.isArray(res.data) ? res.data : []);

    // 현재 시간에 따라서 나누기
    const current=[];
    const past=[];
    const currentDate = new Date();

    if (Array.isArray(res.data)) { 
      // ex용 지우면 data를 res로 변경!!!!
      res.data.forEach(reservation => { 
        const reservationDate = new Date(reservation.reservationDate);
        if (reservationDate >= currentDate) {
          current.push(reservation);
        } else {
          past.push(reservation);
        }
      });
    }

  setReservations(current);
  setPastReservations(past);
};

  useEffect(() => {
    getMyReservationList();
  }, []);

  const CancelModal = ({ reservationId, onClose }) => {
    const [password, setPassword] = useState("");
  
    const handleConfirm = async () => {
      const requestData = { password };
      try {
        const res = await authAPI.checkPassword(requestData);
        if (res.status === 200) {
          await reservationAPI.cancel(reservationId);
          setSuccessMessage("예약이 취소되었습니다.");
          setTimeout(() => {
            getMyReservationList();
            onClose();
          }, 2000); // 2초 후 모달 닫기
        }
        // getMyReservationList();
        // onClose();
      } catch (error) {
        setErrorMessage("비밀번호가 틀렸습니다."); 
        console.error("취소 실패:",  error.response ? error.response.data : error);
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
          {errorMessage && (
  <p className="text-red-500 text-xs mt-1">{errorMessage}</p> // 오류 메시지 표시
)}
{successMessage && (
  <p className="text-green-500 text-xs mt-1">{successMessage}</p> // 성공 메시지 표시
)}
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
              <th className="border-b pl-5 w-3/8 pb-3">팝업/전시명</th>
              <th className="border-b w-3/8 pb-3">주소</th>
              <th className="border-b w-1/8 pb-3">예약일</th>
              <th className="border-b w-1/8 pb-3"></th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <tr>
                <td colSpan="4" className="pt-3 pl-3">예약 내역이 없습니다.</td>
              </tr>
            ) : (
              reservations.map(reservation => (
                <tr key={reservation.id} onClick={() => handleRowClick(reservation.exhibitionId
                )} // 행 클릭 시 디테일 페이지 이동
                className="cursor-pointer hover:bg-gray-100" // 커서 스타일 및 hover 효과
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
          onClose={() => setShowCancelModal(false)} 
        />
      )}
      <div className="mt-8 pb-12 mb-12">
        <h2 className="text-[18px]">지난 예약 목록</h2>
        <hr  className=" border-gray-500"/>
        <table className="w-full mt-3 text-left">
          <thead  >
            <tr >
              <th className="border-b pl-5 w-2/5 pb-3">팝업/전시명</th>
              <th className="border-b w-2/5 pb-3">주소</th>
              <th className="border-b w-1/5 pb-3">예약일</th>
            </tr>
          </thead>
          <tbody>
            {pastReservations.length === 0 ? (
              <tr>
                <td colSpan="4" className="pt-3 pl-3">지난 예약 내역이 없습니다.</td>
              </tr>
            ) : (
              pastReservations.map(reservation => (
                <tr key={reservation.id} onClick={() => handleRowClick(reservation.exhibitionId
                )} // 행 클릭 시 디테일 페이지 이동
                className="cursor-pointer hover:bg-gray-100" // 커서 스타일 및 hover 효과
              >
                  <td className="border-b pl-5 pt-2 pb-2 ">{reservation.exhibitionName}</td>
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