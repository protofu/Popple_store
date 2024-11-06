import { Buffer } from "buffer";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { authAPI } from "../../api/services/Auth";
import { reservationAPI } from "../../api/services/Reservation";
import { getCookie } from "../../utils/CookieUtils";
import Complete from "../common/Complete";

export default function Reservation({ reservation, exhi, onClose }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [request, setRequest] = useState({
    exhibitionId: exhi.id,
    reservationDate: "",
  });

  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const getUserInfo = async () => {
      const token = getCookie("accessToken");
      if (token) {
          const id = jwtDecode(token).id;
          const res = await authAPI.getUser(id);
          setUserInfo(res.data);
      } 
    };
    getUserInfo();
    setRequest({
      ...request, 
      exhibitionId:exhi.id, 
      reservationDate: reservation
    })

  }, []);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };
  
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    const res = await reservationAPI.create(request);
    // QR 이미지 반환
    if (res.status === 200) {
      setIsComplete(prev => !prev);
      setLoading(false);
    }
  };

  const inputStyle = "border border-[#ccc] rounded-[8px] focus:border-[#8900E1] focus:border-2 focus:outline-none px-2 w-full h-[80%] my-auto mx-3";
  const oneLineStyle = "grid grid-cols-[1fr_2fr] h-12 flex items-center mx-5";

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      {isComplete ? 
        <div className="flex flex-col justify-center items-center bg-white rounded-xl p-5 w-[50%] h-[80%] gap-5 px-36 border-2 border-popple-light">
        <Complete text={"닫기"} onClose={onClose} title={"예약완료"} description={"예약은 [마이페이지] - [예약목록]에서 취소할 수 있습니다."}/>
        </div> :
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
              <input type="text" value={reservation} className={inputStyle} disabled />
            </div>
          </div>
          {/* 예약자 정보 */}
          <h1 className="w-full text-[28px] text-popple-light">예약자 정보</h1>
          <div className="w-full">
            <div className={oneLineStyle}>
              <p className="inline">성함</p>
              <input value={userInfo?.name} className={inputStyle} disabled/>
            </div>
            <div className={oneLineStyle}>
              <p className="inline">닉네임</p>
              <input value={userInfo?.nickname} className={inputStyle} disabled />
            </div>
            <div className={oneLineStyle}>
              <p className="inline">이메일</p>
              <input value={userInfo?.email} className={inputStyle} disabled />
            </div>
          </div>
          <h1 className="font-bold">위 사용자의 이메일로 예약 정보가 발송됩니다.</h1>
          <div className="flex">
            <input type="checkbox" checked={isChecked} onClick={handleChange} className="mr-2" />
            <p className="text-center text-[0.75rem]">
              본 서비스 이용을 위해 제3자의 정보 수집 및 공유에 대한 동의 여부를 선택해 주시기 바랍니다.
            </p>
          </div>
          <div className="flex">
            <div 
              className="bg-red-500 rounded-lg mx-2 my-3 py-2 shadow-xl cursor-pointer w-[200px]" 
              onClick={onClose} // 클릭 핸들러를 조건부로 설정
            >
              <p className="text-center text-white text-[1.2rem]">돌아가기</p>
            </div>
            { loading ?
              <div 
                className="bg-gray-300 rounded-lg mx-2 my-3 py-2 shadow-xl cursor-not-allowed w-[200px]"
              >
                <p className="text-center text-white text-[1.2rem]">예약확정 중...</p>
              </div>
              :
              <div 
                className={`bg-green-600 rounded-lg mx-2 my-3 py-2 shadow-xl cursor-pointer w-[200px] ${isChecked ? '' : 'opacity-50 cursor-not-allowed'}`} 
                onClick={isChecked ? handleClick : null} // 클릭 핸들러를 조건부로 설정
              >
                <p className="text-center text-white text-[1.2rem]">예약확정</p>
              </div>
            }
          </div> 
        </div>
      }
    </div>
  );
};
