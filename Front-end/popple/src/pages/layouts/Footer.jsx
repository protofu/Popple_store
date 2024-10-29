import { useNavigate } from "react-router-dom";
import Insta from "../../assets/Insta.png";
import Github from "../../assets/Github.png";

export default function Footer() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleExternalNavigation = (url) => {
    window.location.href = url;
  };

  return (
    <div className="w-full border-t bg-gray-200 min-h-[100px]">
      <div 
        style={{ maxWidth: "calc(100% - 530px)" }}
        className="mx-auto pt-4 pb-5 flex flex-col md:flex-row gap-8 items-center md:items-start md:justify-between"
      >
        <div className="flex flex-col lg:flex-row items-center w-full text-gray-400 mb-5 md:mb-0 lg:gap-16">
          <div className="text-center md:text-left">
            <p className="m-1 text-[13px]">Popeye</p>
            <p className="m-1 text-[13px]">서울특별시 종로구 우정국로2길 21 대왕빌딩 7층</p>
            <p className="m-1 text-[13px]">문의 : sungjae0512@gmail.com</p>
            <p className="m-1 text-[13px]">고객센터 : 24H 상시 운영</p>
            <br />
            <p className="m-1 text-[13px]">&copy; 
              <span className="underline">Popeye Corp.</span> All rights reserved.
            </p>
          </div>
          <div className="flex justify-center items-center ml-5 gap-2 mt-4 md:mt-0">
            <img
              src={Insta}
              alt="인스타 이미지"
              className="w-10 h-10 cursor-pointer object-contain"
              onClick={() => handleExternalNavigation("https://www.instagram.com")}
            />
            <img
              src={Github}
              alt="깃허브 이미지"
              className="w-10 h-10 cursor-pointer object-contain"
              onClick={() => handleExternalNavigation("https://github.com/Popple-store/Popple")}
            />
          </div>
        </div>
        {/* 하단 네브바 */}
        <div className="flex flex-wrap justify-center md:justify-end text-lg w-full gap-6 lg:gap-16 md:gap-8">
          <div className="flex flex-col text-center md:text-left">
            <ul>
              <li className="font-semibold text-[#524747] mb-2 cursor-pointer" onClick={() => handleNavigation("/login")}>
                팝업/전시회
              </li>
              <li className="text-gray-400 text-sm mb-1 cursor-pointer">팝업</li>
              <li className="text-gray-400 text-sm mb-1 cursor-pointer">전시회</li>
              <li className="text-gray-400 text-sm mb-1 cursor-pointer">지도로 보기</li>
            </ul>
          </div>

          <div className="flex flex-col text-center md:text-left">
            <ul>
              <li className="font-semibold text-[#524747] mb-2 cursor-pointer" onClick={() => handleNavigation("/login")}>
                마이페이지
              </li>
              <li className="text-gray-400 text-sm mb-1 cursor-pointer">정보수정</li>
              <li className="text-gray-400 text-sm mb-1 cursor-pointer">나의리뷰</li>
              <li className="text-gray-400 text-sm mb-1 cursor-pointer">예약목록</li>
            </ul>
          </div>

          <div className="flex flex-col text-center md:text-left">
            <ul>
              <li className="font-semibold text-[#524747] mb-2 cursor-pointer" onClick={() => handleNavigation("/login")}>
                이벤트
              </li>
              <li className="text-gray-400 text-sm mb-1 cursor-pointer">이벤트</li>
            </ul>
          </div>

          <div className="flex flex-col text-center md:text-left">
            <ul>
              <li className="font-semibold text-[#524747] mb-2 cursor-pointer" onClick={() => handleNavigation("/login")}>
                고객센터
              </li>
              <li className="text-gray-400 text-sm mb-1 cursor-pointer">FAQ</li>
              <li className="text-gray-400 text-sm mb-1 cursor-pointer">1:1 문의하기</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
