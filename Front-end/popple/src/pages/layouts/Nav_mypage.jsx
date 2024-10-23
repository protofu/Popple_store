import { useState, useEffect } from 'react';
import { useLoginUserStore } from "../../stores/LoginUserState";

export default function Nav_mypage ({ onItemSelect, initialActiveItem }) {
  const { loginUserRole } = useLoginUserStore(state => state);

  const userItems = ["찜", "예약 목록", "방문 리뷰", "정보 수정", "탈퇴"];
  const companyItems = ["팝업/전시 목록", "전체 방문 통계", "정보 수정", "탈퇴"];
  
  const items = loginUserRole === "ROLE_COMPANY" ? companyItems : userItems;

  const [activeItem, setActiveItem] = useState(initialActiveItem);

  // initialActiveItem이 변경될 때만 activeItem을 업데이트
  useEffect(() => {
    setActiveItem(initialActiveItem); 
  }, [initialActiveItem]);

  const handleClick = (item) => {
    setActiveItem(item);
    onItemSelect(item); // 부모 컴포넌트로 선택된 항목 전달
  };

  return (
    <nav className="w-1/6 mt-12 ml-0">
      <ul className="list-none p-0">
        {items.map((item, index) => (
          <li key={index}>
              <a 
                href="#" 
                className={`flex items-center text-gray-700 hover:text-blue-500 rounded-r-3xl py-2 px-3 ${activeItem === item ? 'bg-gray-200' : ''}`}
                onClick={(event) => handleClick(item, event)}
              >

              <div className="icon mr-2 text-2xl flex items-center justify-center" style={{ minWidth: '30px' }}>
                {index === 0 && (loginUserRole === "ROLE_COMPANY" ? "📊" : "❤")}
                {index === 1 && (loginUserRole === "ROLE_COMPANY" ? "📈" : "📋")}
                {index === 2 && (loginUserRole === "ROLE_COMPANY" ? "⚙️" : "🔖")}
                {index === 3 && (loginUserRole === "ROLE_COMPANY" ? "⚠" : "⚙️")}
                {index === 4 && "⚠"}
              </div>
              <div>{item}</div>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
