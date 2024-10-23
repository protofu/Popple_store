import { useNavigate } from "react-router-dom";
import "./Header.module.css";
import { useLoginStore } from "../../stores/LoginState";
import { useEffect } from "react";
import { getCookie, removeCookie } from "../../utils/CookieUtils";
import { useLoginUserStore } from "../../stores/LoginUserState";
import { jwtDecode } from "jwt-decode";

export default function Header() {
  const { isLoggedIn, setIsLoggedIn } = useLoginStore(state => state);
  const { loginUserName, loginUserNickname, loginUserRole, setLoginUser } = useLoginUserStore(state => state);
  
  // 로그인 상태 관리 메서드
  const checkLoggedIn = () => {
    const token = getCookie("accessToken");
    if (token) {
      setIsLoggedIn(true);
      setLoginUser(jwtDecode(token).name, jwtDecode(token).nickname, jwtDecode(token).role);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);
  
  // 화면 이동 메서드
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  }

  // 로그아웃 메서드
  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginUser(null);
    removeCookie("accessToken");
    window.location.reload();
  }
  console.log(loginUserRole);

  return (
    <header className="fixed top-0 w-screen bg-white border-b border-gray-300 z-50 flex flex-col pb-1">
      {/* 헤더 최상단 로그인 관련 */}
      <div className="flex justify-end text-sm text-gray-600 p-1 pr-10 divide-x divide-gray-400">
        { isLoggedIn ? 
          <>
            <li onClick={() => handleNavigation("/my-page")} className="list-none cursor-pointer px-2">{loginUserNickname}</li>
            <li onClick={() => handleLogout()} className="list-none cursor-pointer px-2">
              LOGOUT
            </li>
            <li onClick={() => handleNavigation("/my-page")} className="list-none cursor-pointer px-2">{loginUserRole === "ROLE_COMPANY" ? "COMPANY" : "마이페이지"}</li>
          </>
          :
          <>
            <li onClick={() => handleNavigation("/login")} className="list-none cursor-pointer px-2">
            LOGIN
            </li>
            <li onClick={() => handleNavigation("/sign-up")} className="list-none cursor-pointer px-2">JOIN US</li>
          </>
        }
        <li onClick={() => handleNavigation("/help")} className="list-none cursor-pointer px-2">HELP</li>
      </div>

      {/* 헤더 중반부 로고 */}
      <div className="flex justify-center py-2.5">
        <img src="/popple_logo(2).png" alt="메인 로고" onClick={() => handleNavigation("/")} className="list-none cursor-pointer w-[120px] h-auto"/>
      </div>

      {/* 헤더 하단 네브바 */}
      
      <div className="flex justify-center text-xl gap-4">
        { loginUserRole === "ROLE_ADMIN" || loginUserRole === "ROLE_COMPANY" ? 
          <>
            <li onClick={() => handleNavigation("/pop-up")} className="list-none cursor-pointer">
              팝업
            </li>
            <li onClick={() => handleNavigation("/exhibition")} className="list-none cursor-pointer">전시회</li>
            <li onClick={() => handleNavigation("/event")} className="list-none cursor-pointer">EVENT</li>
            <li onClick={() => handleNavigation("/regist")} className="list-none cursor-pointer">팝업/전시등록</li>
          </>
          :
          <>
            <li onClick={() => handleNavigation("/pop-up")} className="list-none cursor-pointer">
              팝업
            </li>
            <li onClick={() => handleNavigation("/exhibition")} className="list-none cursor-pointer">전시회</li>
            <li onClick={() => handleNavigation("/event")} className="list-none cursor-pointer">EVENT</li>
          </>
        }
      </div>
    </header>
  );
};
