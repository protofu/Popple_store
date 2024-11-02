import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center w-full h-full my-10 relative text-center p-6">
      <h2 className="text-xl font-bold text-gray-600 mb-4">
        404 - 페이지를 찾을 수 없습니다
      </h2>
      <figure className="inline-block animate-float">
        <img
          src="/icons/404-illust.svg"
          alt="비어있다 이미지"
          className="w-64 h-48 opacity-90"
        />
      </figure>
      <div className="border-2 p-2 w-[200px] rounded-lg text-sm text-white bg-popple-light cursor-pointer hover:bg-popple" onClick={() => navigate("/")}>
        메인으로 돌아가기
      </div>
    </div>
  );
};
