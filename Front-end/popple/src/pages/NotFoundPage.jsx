import { useNavigate } from "react-router-dom";
import styles from "./styles/NotFoundPage.module.css";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center w-full h-full my-10 relative text-center p-6">
      <h2 className="text-[48px] font-bold text-gray-600 mb-4">
        404 ERROR
      </h2>
      <p className="text-[16px] font-bold text-gray-600 mb-4">
        죄송합니다. 페이지를 찾을 수 없습니다. <br />
        존재하지 않는 주소를 입력하셨거나, <br />
        요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
      </p>
      <figure className="inline-block animate-float">
        <img
          src="/icons/404-illust.svg"
          alt="비어있다 이미지"
          className="w-64 h-48 opacity-90"
        />
      </figure>
      <div
        className="relative inline-block text-gray-800 font-bold cursor-pointer group p-1"
        onClick={() => navigate("/")}
      >
        <span className="relative z-10">메인으로 돌아가기</span>
        <span className="absolute left-0 bottom-0 h-[2px] w-full bg-gray-800 transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100" />
      </div>
    </div>
  );
}
