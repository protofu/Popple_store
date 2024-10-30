import { useState, useEffect } from 'react';
import Nav from '../pages/layouts/Nav_mypage';
import { useLoginUserStore } from '../stores/LoginUserState';
import LikeList from '../components/my-page/LikeList';
import ReservationList from '../components/my-page/ReservationList';

export default function MyPage() {
  const textStyle = "text-[28px] ml-3 font-bold mt-5";
  const subtitleStyle = "text-[21px] font-semibold mt-2";
  const inputStyle = "w-[300px] h-[50px] border border-[#ccc] rounded-[8px] focus:border-[#8900E1] focus:border-2 focus:outline-none px-2";
  
  const { loginUserRole } = useLoginUserStore(state => state);
  const [activeItem, setActiveItem] = useState("찜");
  const [password, setPassword] = useState('');

  useEffect(() => {
    // 역할에 따라 초기값 설정
    if (loginUserRole === "ROLE_COMPANY") {
      setActiveItem("팝업/전시 목록");
    } else {
      setActiveItem("찜");
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

  const handleConfirm = () => {
    console.log("비밀번호:", password);
    setPassword('');
  };

  const renderPasswordInput = () => (
    <div className="flex flex-col items-center">
      <div className="text-center mb-3 mt-3">
        <p className="font-bold text-[18px]">보안 인증이 필요합니다.</p>
        <p className="font-bold text-[18px]">비밀번호를 입력하세요.</p>
      </div>
      <input 
        type="password" 
        placeholder="비밀번호 입력" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
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
    "방문 리뷰": '방문 리뷰 관련 내용',
    "정보 수정": renderPasswordInput(),
    "탈퇴": renderPasswordInput(),
    "팝업/전시 목록": '팝업/전시 목록 관련 내용 (기업)',
    "전체 방문 통계": '전체 방문 통계 관련 내용 (기업)',
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
