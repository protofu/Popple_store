import { useNavigate } from "react-router-dom";

export default function Complete({ path, text, onClose }) {
  const navigate = useNavigate();

  const handleClick = (path) => {
   
    navigate(path);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-[60vh]">
      {/* 내용 자리 */}
      <div className="text-center ">
        {/* <FiUserCheck className="text-4xl text-popple-light size-48 mb-4" /> */}
        <img src="/user_check.png" alt="완료이미지" />
        <div className="mb-4">
          <h1 className="text-2xl font-bold">예약완료</h1>
          <h1 className="text-lg">어쩌구 저쩌구 한 내용</h1>
        </div>
        <h2 className="text-sm text-gray-600">주의사항 같은거</h2>
      </div>
      {/* 버튼 자리 */}
      <div className="mt-8">
        <button className="px-4 py-2 bg-popple text-white text-[16px] rounded w-[150px] mx-4" onClick={onClose ? () => onClose() : () => handleClick(path)}>{text}</button>
        <button className="px-4 py-2 bg-popple text-white text-[16px] rounded w-[150px] mx-4" onClick={() => handleClick("/")}>메인으로</button>
      </div>
    </div>
  );
}
