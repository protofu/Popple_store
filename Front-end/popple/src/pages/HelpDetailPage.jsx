import { useEffect, useState } from "react";
import { helpAPI } from "../api/services/Help";
import { useLocation, useNavigate } from "react-router-dom";

export default function HelpDetailPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [item, setItem] = useState(null); // 초기값을 null로 변경
  const [author, setAuthor] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log("Fetched userId: ", userId);
    setCurrentUserId(userId);
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        console.error("No ID provided");
        return;
      }

      try {
        const response = await helpAPI.gethelplist(id);
        const data = response.data;

        console.log("API Response:", data);

        if (data) {
          if (data.helps && data.helps.length > 0) {
            const helpItem = data.helps[0];
            setItem(helpItem);
            setAuthor(data.nickname || 'ADMIN');
            setCreatedAt(helpItem.createdAt);
          } else if (data.faqs && data.faqs.length > 0) {
            const faqItem = data.faqs[0];
            setItem(faqItem);
            setAuthor('ADMIN'); // FAQ의 경우
          }
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    console.log("item:", item);
    console.log("item.id:",item.id);
    console.log("item.userId:",item.userId);
    console.log("currentUserId:", currentUserId);
  }, [item, currentUserId]);

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
          <span>작성자: {author}</span>
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
