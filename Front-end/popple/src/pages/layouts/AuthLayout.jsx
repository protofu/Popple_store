import { Outlet, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function AuthLayout({ children }) {
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };
  return (
    <div className="
      items-center 
      lg:max-w-[calc(100%-30%)]
      sm:h-[85vh]
      sm:max-h-[calc(100%-15%)]
      h-screen     
      w-full p-4 mx-auto
      border border-[#8900E1]
    ">
      <img src="/popple_logo(2).png" alt="로고이미지" onClick={() => handleNavigate("/")} className="
        w-[180px]
        bg-white
        block absolute left-[calc(50%-70px)] top-[calc(7.5%-40px)]
        cursor-pointer
      "/>
      {children ? children : <Outlet />}
    </div>
  );
};

// PropTypes 설정
AuthLayout.propTypes = {
  children: PropTypes.object,
};