import { useEffect, useState } from "react";
import { helpAPI } from "../api/services/Help";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLoginUserStore } from "../stores/LoginUserState";
import moment from "moment";
import { poppleAlert } from "../utils/PoppleAlert";

export default function HelpDetailPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const type = queryParams.get('type');
  const [item, setItem] = useState(null); // 초기값을 null로 변경
  const [answer, setAnswer] = useState(false);
  const [answerData, setAnswerData] = useState({
    id: id,
    answer: "",
  });
  const { loginUserNickname, loginUserRole } = useLoginUserStore(state => state);
  const navigate = useNavigate();

  // 날짜 포맷 변환 함수
  const formatDate = (dateArray) => {
    const [year, month, day, hour, minute, second] = dateArray;
    return moment([year, month - 1, day, hour, minute, second]).format('YYYY-MM-DD HH:mm');
  };

  useEffect(() => {
    if (type === "faq"){
      const getFaq = async () => {
        try {
          const faqDatas = await axios.get("/jsons/faqs.json");
          setItem(faqDatas.data[id]);
        } catch (error) {
          console.err("error", error);
        }
      };
      getFaq();
    } else if (type === "help") {
      const getHelp = async () => {
        try {
          const faqData = await helpAPI.gethelp(id);
          faqData.data.createdAt = formatDate(faqData.data.createdAt);
          faqData.data.updatedAt = formatDate(faqData.data.updatedAt);
          setItem(faqData.data);
        } catch (error) {
          console.err("error", error);
        }
      };
      getHelp();
    }

  }, []);

  if (!item) {
    return <p>Loading...</p>;
  }

  const textStyle = "text-[28px] ml-3 font-bold mt-5";

  const handleClick = () => {
    navigate('/help');
  };

  const handledeleteClick = async () => {
    try {
      await helpAPI.delete(id);
      await poppleAlert.alert("", "성공적으로 삭제되었습니다.");
      navigate("/help");
    } catch (err) {
      console.err("error", err);
    }
  };

  const handleAnswerClick = () => {
    setAnswer(true);
  };

  const handleReplyClick = async () => {
    try {
      await helpAPI.answer(answerData);
      await poppleAlert.alert("", "답변이 작성되었습니다.");
      setAnswer(false);
      window.location.reload();
    } catch (err) {
      console.err(err);
    }
  };

  return (
    <div className="flex flex-col h-[80vh]">
      <div className="flex justify-between items-center">
        <h1 className={textStyle}>{item.title}</h1>
        <div className="text-[17px] ml-3 mt-8">
          <span>작성자: {item.username ? item.username : "ADMIN"}</span>
          {item.createdAt && (
            <span className="ml-4">작성일: {item.createdAt}</span>
          )}
        </div>
      </div>
      <hr className="mt-2 mb-0 border-gray-500" />
      <div className="h-[50%] text-[17px] ml-3 mt-5 mb-5 pt-5">
        {item.description}
      </div>
      <hr className="border-1 border-black"/>
      {/* 답변 */}
      {/* 답변이 있고 && role이 Admin이 아닐때 */}
      {item.answer && !(loginUserRole === "ROLE_ADMIN") && (
        <div className={`h-[30%] text-[17px] border-t border-gray-500`}>
            <div className="flex flex-col py-5 pb-10 border-b border-gray-500">
              <div className="flex items-start ml-5">
                <span className="text-[28px]">↳</span>
                <span className="ml-2 mt-5 text-[17px] font-bold">ADMIN 답변</span>
              </div>
              <span className="mt-5 ml-10 mr-10 border border-gray-200 px-2 py-2 pb-10 rounded-lg">{answer}</span>
            </div>
        </div>
      )}
      {/* 답변이 있고 Role이 Admin이면 */}
      {(item.answer !== null && loginUserRole == "ROLE_ADMIN") && (
        <div className={`h-[30%] text-[17px] border-t border-gray-500`}>
            <div className="flex flex-col py-5 pb-10 border-b border-gray-500">
              <div className="flex items-start ml-5">
                <span className="text-[28px]">↳</span>
                <span className="ml-2 mt-5 text-[17px] font-bold">ADMIN 답변</span>
              </div>
              <span className="mt-5 ml-10 mr-10 border border-gray-200 px-2 py-2 pb-10 rounded-lg">{item.answer}</span>
            </div>
        </div> 
      )}
      {/* 답변이 없고 Role이 Admin이면 */}
      {(item.answer === null && loginUserRole == "ROLE_ADMIN" && answer) && (
        <div className={`h-[30%] text-[17px] border-t border-gray-500 mb-10 `}>
          <div className="flex flex-col py-5 pb-10 border-b border-gray-500">
            <div className="flex items-start ml-5">
              <span className="text-[28px]">↳</span>
              <span className="ml-2 mt-5 text-[17px] font-bold">ADMIN 답변</span>
            </div>
            <input className="my-5 ml-10 mr-10 border border-gray-200 px-2 py-2 pb-10 rounded-lg" onChange={(e) => setAnswerData({...answerData, answer:e.target.value})}/>
            <div className="flex justify-end">
              <button className="text-white px-4 py-2 border bg-green-600 rounded-lg w-[120px]" onClick={handleReplyClick}>작성 완료</button>
            </div>
          </div>
        </div> 
      )}
        

      <div className="flex justify-end mt-5 h-[40px] gap-4">
        <button
          onClick={handleClick}
          className="text-white px-4 py-2 bg-[#8900E1] rounded-lg"
        >
          목록으로
        </button>
        {item.username === loginUserNickname && (
            <button
              onClick={handledeleteClick}
              className="text-white px-4 py-2 border bg-red-500 rounded-lg"
            >
              삭제
            </button>
        )}
        {(loginUserRole === "ROLE_ADMIN" && item.answer === null && !answer) && (
            <button
              onClick={handleAnswerClick}
              className="text-white px-4 py-2 border bg-green-600 rounded-lg"
            >
              답글 달기
            </button>
        )}
        
      </div>
    </div>
  );
}
