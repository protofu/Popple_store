import { useEffect, useState } from "react";
import { reservationAPI } from "../../api/services/Reservation";
import { FaUserCheck } from "react-icons/fa";
import { GiCrossMark } from "react-icons/gi";

export default function ReservationList({ eventId, onClose }) {
  // 예약자 명단
  const [reserverList, setReserverList] = useState([]);

  const getReservationList = async () => {
    const res = await reservationAPI.getReserverList(eventId);
    console.log(res.data);
    setReserverList(res.data);
  };

  useEffect(() => {
    getReservationList();
  }, [])

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const itemsPerPage = 10; // 한 페이지에 보여줄 항목 수

  // 페이지별로 현재 보여줄 항목들 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = reserverList.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(reserverList.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function getStatus(attend) {
    if (attend) {
      return { value: <FaUserCheck />, color: 'text-green-500' }; // true일 때 초록색 참석
    } else {
      return { value: <GiCrossMark />, color: 'text-red-400' };   // false일 때 빨간색 불참
    }
  }

  const trStyle = "grid grid-cols-[0.5fr_1.5fr_1.5fr_1fr_1fr] border-b my-auto";
  const thStyle = "my-auto";

  return (
    <div>
      <div className="mt-8 pb-12 mb-12">
          {/* <h2 className="text-[16px]">팝업/전시 목록, 총 <span className="font-bold text-[24px] text-popple-light">{popupList.length}</span>개의 팝업/전시가 있습니다.</h2> */}
          <hr  className=" border-gray-500"/>
          <table className="w-full mt-3 text-left">
            <thead>
              <tr className={`${trStyle} border-gray-500 h-10`}>
                <th className="text-center">No.</th>
                <th className="text-center">예약자명</th>
                <th className="text-center">이메일</th>
                <th className="text-center">예약 시간</th>
                <th className="text-center">상태</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((reserve, index) => {
                const { value, color } = getStatus(reserve.attend);
                return (
                  <tr key={reserve.id} className={trStyle}>
                    <td className={`${thStyle} h-12 flex items-center`}>{index+1}</td>
                    <td className={`${thStyle} m-auto`}>{reserve.reserverName}</td>
                    <td className={`${thStyle} m-auto`}></td>
                    <td className={`${thStyle} m-auto`}></td>
                    <td className={`${thStyle} ${color} text-center`}>{value}</td>
                  </tr>
                );
              })}
              
            </tbody>
          </table>
          {/* 페이지네이션 버튼 10개가 넘지 않으면 페이지네이션 버튼 안보임*/}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`mx-1 px-2 py-1 rounded ${currentPage === index + 1 ? "bg-popple-light text-white" : "bg-gray-300 text-black"}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
    </div>
  );
};
