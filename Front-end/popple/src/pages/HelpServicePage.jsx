import { useEffect, useState } from "react";
import { helpAPI } from "../api/services/Help";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLoginUserStore } from "../stores/LoginUserState";

export default function HelpServicePage() {
  const textStyle = "text-[28px] ml-3 font-bold mt-5";
  const [faqs, setFaqs] = useState([]);
  const [helps, setHelps] = useState([]);
  const { loginUserRole } = useLoginUserStore(state => state);
  const navigate = useNavigate();

  useEffect(() => {
    const gethelp = async () => {
      try {
        const faqDatas = await axios.get("/jsons/faqs.json");
        setFaqs(faqDatas.data);
        let response = null;
        if (loginUserRole === "ROLE_ADMIN") {
          response = await helpAPI.gethelplist();
        } else {
          response = await helpAPI.getMyHelpList();
        }
        setHelps(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed", error);
      }
    };
    
    gethelp();
  }, []);

  const handleRowClick = (faqId) => {
    navigate(`/help/detail?type=faq&id=${faqId}`);  // 자주 묻는 질문 상세 페이지로 이동
  };

  const handleHelpRowClick = (helpId) => {
    navigate(`/help/detail?type=help&id=${helpId}`); // 1:1문의 상세 페이지로 이동
  };

  const handleCreateClick = () => {
    navigate('/help/create'); // 문의하기 페이지로 이동
  };

  return (
    <>
      <h1 className={textStyle}>자주 묻는 질문</h1>
      <hr className="mt-2 mb-0 border-gray-500" />
      {faqs.length > 0 ? (
        <table className="mt-0 pb-8 border-separate border-spacing-0 w-full">
          <tbody>
            {faqs.map((faq, index) => (
              <tr
                key={index}
                onClick={() => handleRowClick(index)}
                className="cursor-pointer hover:bg-gray-100"
              >
                <td className="border-b border-gray-300 px-4 py-3 flex justify-between items-center">
                  <span>Q .&nbsp; {faq.title}</span>
                  <span className="text-[21px]">&gt; </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-2 ml-3">FAQ가 없습니다.</p>
      )}
      <div className="flex justify-between items-center mt-5">
        <h1 className={textStyle}>1:1 문의</h1>
        <button 
          onClick={handleCreateClick} 
          className="ml-4 text-white px-4 py-2 bg-[#8900E1] rounded-lg p-3 mt-5"
        >
          문의하기
        </button>
      </div>
      <hr className="mt-2 mb-0 border-gray-500 flex-grow" />

      {helps.length > 0 ? (
        <table className="mt-0 pb-8 border-separate border-spacing-0 w-full">
          <tbody>
            {helps.map((help) => (
              <tr
                key={help.id}
                onClick={() => handleHelpRowClick(help.id)}
                className="cursor-pointer hover:bg-gray-100"
              >
                <td className="border-b border-gray-300 px-4 py-3 flex justify-between items-center">
                  <div>
                    <span>Q .&nbsp; {help.title}</span>
                    {help.answer && (
                      <span className="text-blue-500 ml-5 text-[12px]">답변완료</span> // 답변이 있는 경우
                    )}
                  </div>
                  
                  <span className="text-[21px]">&gt; </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-2 ml-3">1:1 문의가 없습니다.</p>
      )}
    </>
  );
}
