import { useNavigate } from "react-router-dom";
import Insta from "../../assets/Insta.png";
import Github from "../../assets/Github.png";

export default function Footer() {
  const navigate = useNavigate();

  const handleNavigation = (path, state) => {
    navigate(path, state);
  };

  const handleExternalNavigation = (url) => {
    window.location.href = url;
  };

  return (
    <footer className="hidden sm:flex sm:flex-col-reverse lg:flex-row border-t bg-gray-200 min-h-[100px] px-[10%] py-4">
      <section className="flex flex-col lg:items-center text-gray-400 mb-5 md:mb-0 lg:gap-16 whitespace-nowrap">
        <div className="text-center md:text-left">
          <p className="m-1 text-[13px]">Popeye</p>
          <p className="m-1 text-[13px]">서울특별시 종로구 우정국로2길 21 대왕빌딩 7층</p>
          <p className="m-1 text-[13px]">문의 : sungjae0512@gmail.com</p>
          <p className="m-1 text-[13px]">고객센터 : 24H 상시 운영</p>
          <p className="m-1 text-[13px] mt-5">&copy; 
            <span className="underline">Popeye Corp.</span> All rights reserved.
            <img
              src={Insta}
              alt="인스타 이미지"
              className="w-10 h-10 cursor-pointer object-contain inline ml-6"
              onClick={() => handleExternalNavigation("https://www.instagram.com")}
            />
            <img
              src={Github}
              alt="깃허브 이미지"
              className="w-10 h-10 cursor-pointer object-contain inline ml-3"
              onClick={() => handleExternalNavigation("https://github.com/Popple-store/Popple")}
            />
          </p>
        </div>
      </section>
      {/* 하단 네브바 */}
      <section className="flex flex-nowrap justify-between pb-12 lg:justify-end text-lg w-full gap-6">
        <div className="flex flex-col text-left">
          <ul>
            <li className="font-semibold text-[#524747] mb-2 cursor-pointer" onClick={() => handleNavigation("/")}>
              팝업/전시회
            </li>
            <li className="text-gray-400 text-sm mb-1 cursor-pointer" onClick={() => handleNavigation("/pop-up")}>팝업</li>
            <li className="text-gray-400 text-sm mb-1 cursor-pointer" onClick={() => handleNavigation("/exhibition")}>전시회</li>
          </ul>
        </div>

        <div className="flex flex-col text-left">
          <ul>
            <li className="font-semibold text-[#524747] mb-2 cursor-pointer" onClick={() => handleNavigation("/my-page")}>
              마이페이지
            </li>
            <li className="text-gray-400 text-sm mb-1 cursor-pointer" onClick={() => handleNavigation("/my-page", {state : {activeItem: "정보 수정"} })}>정보수정</li>
            <li className="text-gray-400 text-sm mb-1 cursor-pointer" onClick={() => handleNavigation("/my-page", {state : {activeItem: "방문 리뷰"} })}>나의리뷰</li>
            <li className="text-gray-400 text-sm mb-1 cursor-pointer" onClick={() => handleNavigation("/my-page", {state : {activeItem: "예약 목록"} })}>예약목록</li>
          </ul>
        </div>

        <div className="flex flex-col text-left">
          <ul>
            <li className="font-semibold text-[#524747] mb-2 cursor-pointer" onClick={() => handleNavigation("/event")}>
              이벤트
            </li>
            <li className="text-gray-400 text-sm mb-1 cursor-pointer" onClick={() => handleNavigation("/event")}>이벤트</li>
          </ul>
        </div>

        <div className="flex flex-col text-left">
          <ul>
            <li className="font-semibold text-[#524747] mb-2 cursor-pointer" onClick={() => handleNavigation("/help")}>
              고객센터
            </li>
            <li className="text-gray-400 text-sm mb-1 cursor-pointer" onClick={() => handleNavigation("/help")}>FAQ</li>
            <li className="text-gray-400 text-sm mb-1 cursor-pointer" onClick={() => handleNavigation("/help")}>1:1 문의하기</li>
          </ul>
        </div>
      </section>
    </footer>
  );
}
