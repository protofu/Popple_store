import { useState, useEffect } from 'react';
import Nav from '../pages/layouts/Nav_mypage';
import { useLoginUserStore } from '../stores/LoginUserState';
import LikeList from '../components/my-page/LikeList';
import ReservationList from '../components/my-page/ReservationList';
import MyReview from '../components/my-page/MyReview';
import { useLocation, useParams } from 'react-router-dom';
import ChangeInfo from '../components/my-page/ChangeInfo';
import { poppleAlert } from '../utils/PoppleAlert';
import { authAPI } from '../api/services/Auth';
import { removeCookie } from '../utils/CookieUtils';
import PopupList from '../components/company/PopupList';

export default function MyPage() {
  const textStyle = "text-[28px] ml-3 font-bold mt-5";
  const subtitleStyle = "text-[21px] font-semibold mt-2";
  const inputStyle = "w-[300px] h-[50px] border border-[#ccc] rounded-[8px] focus:border-[#8900E1] focus:border-2 focus:outline-none px-2";

  const { state }= useLocation();
  const { loginUserRole } = useLoginUserStore(state => state);
  const [activeItem, setActiveItem] = useState(state?.activeItem || "찜");
  
  useEffect(() => {
    // 역할에 따라 초기값 설정
    if (loginUserRole === "ROLE_COMPANY") {
      setActiveItem("팝업/전시 목록");
    } 
    // 마이페이지를 벗어날 때 초기화
    return () => {
      localStorage.setItem('activeItem', activeItem);
    };
  }, [loginUserRole]);
  
  const handleItemSelect = (item) => {
    setActiveItem(item);
    localStorage.setItem('activeItem', item);
  };
  
  const [resingConfirm, setResignConfirm] = useState("");

  const handleConfirm = async () => {
    if (resingConfirm === "모든 내용을 동의하고 탈퇴하겠습니다") {
      try {
        await authAPI.delete();
        await poppleAlert.alert("탈퇴가 완료되었습니다.");
        removeCookie("accessToken");
        window.location.href = "/";
      } catch (error) {
        removeCookie("accessToken");
        window.location.href = "/";
      }
    } else {
      poppleAlert.alert("", "입력하신 문구가 일치하지 않습니다.");
    }
  }
  const resignRender = () => (
    <div className="flex flex-col items-center">
      <div className="text-center mb-3 mt-3">
        <p className="font-bold text-[18px] mb-2">정말로 탈퇴하시겠습니까?</p>
        <p className="text-[18px] mb-8">탈퇴 후에는 계정과 <strong>모든 데이터가 삭제</strong>되며, 복구할 수 없습니다.</p>
        <p className="text-[18px]">탈퇴를 진행하려면 <span className='text-red-500'>'모든 내용을 동의하고 탈퇴하겠습니다'</span>라는 문구를 입력해 주세요.</p>
      </div>
      <input 
        type="text" 
        placeholder="모든 내용을 동의하고 탈퇴하겠습니다" 
        value={resingConfirm} 
        onChange={(e) => setResignConfirm(e.target.value)} 
        className={inputStyle} 
      />
      <button onClick={handleConfirm} className="bg-[#8900E1] text-white rounded-lg p-3 mt-3">
        확인
      </button>
    </div>
  );
  
  const contentMap = {
    "찜": <LikeList />,
    "예약 목록": <ReservationList />,
    "방문 리뷰": <MyReview />,
    "정보 수정": <ChangeInfo />,
    "탈퇴": resignRender(),
    "팝업/전시 목록": <PopupList/>,
    "전체 방문 통계": "기업 전체 방문 통계",
  };

  const renderContent = () => {
    return contentMap[activeItem] || null;
  };

  return (
    <>
      <h1 className={textStyle}>{loginUserRole === "ROLE_COMPANY" ? "Company Page" : "My Page"}</h1>
      <hr className="mt-2 mb-0 border-gray-500" />
      <div className="flex mypage-container mt-2 items-start">
        <Nav initialActiveItem={activeItem} onItemSelect={handleItemSelect} />
        <div className="flex-grow mt-0 ml-5">
          <h2 className={subtitleStyle}>{activeItem}</h2>
          <div className='mt-5'>{renderContent()}</div>
        </div>
      </div>
    </>
  );
}
