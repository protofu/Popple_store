import { Outlet } from "react-router-dom";

export default function AuthLayout() {
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
      <Outlet />
    </div>
  );
};
