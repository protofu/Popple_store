import React, { useEffect, useState } from "react"; 
import { reservationAPI } from "../../../src/api/services/Reservation";
export default function ReservationList() {

  const [reservations, setReservations] = useState([]);
  const [pastReservations, setPastReservations] = useState([]);

  // 예약 목록 가져오기
  const getMyReservationList = async () => {
    const res = await reservationAPI.getList();
    console.log("API 응답:", res);
    setReservations(Array.isArray(res) ? res : []);
  

  // 현재 시간에 따라서 나누기
  const current=[];
  const past=[];

  if (Array.isArray(res)) {
    res.forEach(reservation => {
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
}


  // 컴포넌트가 렌더링될 때 예약한 목록을 가져옴
  useEffect(() => {
    getMyReservationList();
  }, []);

  return (
    <div>
      <div className="pb-12 mb-12">
        <h2 className="text-[18px]">예약 목록</h2>
        <hr  className=" border-gray-500"/>
        <table className="w-full mt-3 text-left">
          <thead  >
            <tr >
              <th className="border-b pl-5 w-1/4 pb-3">팝업/전시명</th>
              <th className="border-b w-1/2 pb-3">주소</th>
              <th className="border-b w-1/4 pb-3">예약일</th>
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
                  <td className="border-b">{reservation.exhibitionName}</td>
                  <td className="border-b">{reservation.address}</td>
                  <td className="border-b">{new Date(reservation.reservationDate).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h2 className="text-[18px]">지난 예약 목록</h2>
        <hr  className=" border-gray-500"/>
        <table className="w-full mt-3 text-left">
          <thead  >
            <tr >
              <th className="border-b pl-5 w-1/4 pb-3">팝업/전시명</th>
              <th className="border-b w-1/2 pb-3">주소</th>
              <th className="border-b w-1/4 pb-3">예약일</th>
            </tr>
          </thead>
          <tbody>
            {pastReservations.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">예약 내역이 없습니다.</td>
              </tr>
            ) : (
              pastReservations.map(reservation => (
                <tr key={reservation.id}>
                  <td className="border-b">{reservation.exhibitionName}</td>
                  <td className="border-b">{reservation.address}</td>
                  <td className="border-b">{new Date(reservation.reservationDate).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};