import { useEffect, useState } from "react";
import { helpAPI } from "../api/services/Help";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function HelpDetailPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const type = queryParams.get('type');
  const [item, setItem] = useState(null); // 초기값을 null로 변경
  const [author, setAuthor] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();

  console.log(type);
  console.log("id", id);
  useEffect(() => {
    if (type === "faq"){
      const getFaq = async () => {
        try {
          const faqDatas = await axios.get("/jsons/faqs.json");
          setItem(faqDatas.data[id]);
          console.log(faqDatas.data[id]);
        } catch (error) {
          console.log("error", error);
        }
      };
      getFaq();
    } else if (type === "help") {
      // const getHelp = async () => {
      //   try {
      //     const faqDatas = await ;
      //     setItem(faqDatas[id]);
      //   } catch (error) {
      //     console.log("error", error);
      //   }
      // };
      // getHelp();
    }

  }, []);

  console.log(item);

  if (!item) {
    return <p>Loading...</p>;
  }
  
  const title = item.title || '제목 없음';
  const description = item.description || '설명 없음';
  const answer = item.answer || null;

  const textStyle = "text-[28px] ml-3 font-bold mt-5";

  const handleClick = () => {
    navigate('/help');
  };

  const handledeleteClick = async () => {
    // item.id와 currentUserId를 비교하여 삭제 권한 확인
    if (item.id === currentUserId) {
      try {
        await helpAPI.delete(item.id);
        navigate('/help');
      } catch (error) {
        console.error("Failed to delete", error);
      }
    } else {
      alert("권한이 없습니다.");
    }
  };

  return (
    <div className="flex flex-col h-[80vh]">
      <div className="flex justify-between items-center">
        <h1 className={textStyle}>{title}</h1>
        <div className="text-[17px] ml-3 mt-8">
          <span>작성자: {author ? author : "ADMIN"}</span>
          {createdAt && (
            <span className="ml-4">작성일: {new Date(createdAt).toLocaleDateString()}</span>
          )}
        </div>
      </div>
      <hr className="mt-2 mb-0 border-gray-500" />
      <div className="h-[50%] text-[17px] ml-3 mt-5 mb-5 pt-5">
        {description}
      </div>
      {currentUserId&& currentUserId === item.id && (
        <div className="flex justify-end mt-5 pb-2">
          <button
            onClick={handledeleteClick}
            className="px-4 py-2 border border-gray-300 text-red-500 rounded-lg"
          >
            삭제
          </button>
        </div>
      )}
      <div className={`h-[30%] text-[17px] border-t border-gray-500`}>
        {answer ? (
          <div className="flex flex-col py-5 pb-10 border-b border-gray-500">
            <div className="flex items-start ml-5">
              <span className="text-[28px]">↳</span>
              <span className="ml-2 mt-5 text-[17px] font-bold">ADMIN 답변</span>
            </div>
            <span className="mt-5 ml-10 mr-10 border border-gray-200 px-2 py-2 pb-10 rounded-lg">{answer}</span>
          </div>
        ) : null}
      </div>
      <div className="flex justify-end mt-5">
        <button
          onClick={handleClick}
          className="text-white px-4 py-2 bg-[#8900E1] rounded-lg"
        >
          목록으로
        </button>
      </div>
    </div>
  );
}
