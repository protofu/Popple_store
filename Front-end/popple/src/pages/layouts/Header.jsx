import { useNavigate } from "react-router-dom";
import mainLogo from "../../assets/MainLogo.png";

export default function Header() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  }
  return (
    <header className="fixed top-0 w-screen bg-white border-b border-gray-300 z-50 flex flex-col pb-1">
      {/* 헤더 최상단 로그인 관련 */}
      <div className="flex justify-end text-sm text-gray-600 p-1 pr-10 divide-x divide-gray-400">
        <li onClick={() => handleNavigation("/login")} className="list-none cursor-pointer px-2">
          LOGIN
        </li>
        <li onClick={() => handleNavigation("/sign-up")} className="list-none cursor-pointer px-2">JOIN US</li>
        <li className="list-none cursor-pointer px-2">HELP</li>
      </div>

      {/* 헤더 중반부 로고 */}
      <div className="flex justify-center py-2.5">
        <img src={mainLogo} alt="메인 로고" />
      </div>

      {/* 헤더 하단 네브바 */}
      <div className="flex justify-center text-lg gap-4">
        <li onClick={() => handleNavigation("/login")} className="list-none cursor-pointer">
          팝업
        </li>
        <li className="list-none cursor-pointer">전시회</li>
        <li className="list-none cursor-pointer">EVENT</li>
      </div>
    </header>
  );
};
