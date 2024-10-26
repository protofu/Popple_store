import moment from "moment";

export default function Reservation({ reservation, exhi }) {
  const reservationTime = moment(reservation).format('YYYY-MM-DD');
  console.log("모달", moment(reservation).format('YYYY-MM-DD'));

  const inputStyle = "border border-[#ccc] rounded-[8px] focus:border-[#8900E1] focus:border-2 focus:outline-none px-2 w-full h-[80%] my-auto mx-3";
  const oneLineStyle = "grid grid-cols-[1fr_2fr] h-12 flex items-center mx-5";
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col justify-center items-center bg-white rounded-xl p-5 w-[50%] h-[80%] gap-5 px-36 border-2 border-popple-light">
        <h1 className="text-[32px]">예약하기</h1>
        {/* 팝업 정보 */}
        <h1 className="w-full text-[28px] text-popple-light">팝업 정보</h1>
        <div className="w-full">
          <div className={oneLineStyle}>
            <p className="inline">팝업/전시 명</p>
            <input type="text" value={exhi.exhibitionName} className={inputStyle} disabled />
          </div>
          <div className={oneLineStyle}>
            <p className="inline">예약 날짜</p>
            <input type="text" value={reservationTime} className={inputStyle} disabled />
          </div>
        </div>
        {/* 예약자 정보 */}
        <h1 className="w-full text-[28px] text-popple-light">예약자 정보</h1>
        <div className="w-full">
          <div className={oneLineStyle}>
            <p className="inline">예약자 성함</p>
            <input value={exhi.exhibitionName} className={inputStyle} disabled/>
          </div>
          <div className={oneLineStyle}>
            <p className="inline">이메일</p>
            <input value={reservationTime} className={inputStyle} disabled />
          </div>
          <div className={oneLineStyle}>
            <p className="inline">전화번호</p>
            <input value={reservationTime} className={inputStyle} disabled />
          </div>
        </div>
        <h1 className="font-bold">입력하신 전화번호로 예약 정보가 발송됩니다.</h1>
        <div className="flex">
          <input type="checkbox" className="mr-2" />
          <p className="text-center text-[0.75rem]">
            여기는 제 3자의 뭐시기 저시기 정보는 뭐시기 저시기 3년의 뭐시기 저시기 뭐라 했던거 같은데 무튼 그런 내용의 동의 받던가 말던가 하는 내용이 있는 자리
          </p>
        </div>
        <div className="bg-popple-light rounded-lg mx-2 my-3 py-2 shadow-xl cursor-pointer w-[200px]">
          <p className="text-center text-white text-[1rem]">예약확정</p>
        </div>
      </div>
    </div>
  );
};
