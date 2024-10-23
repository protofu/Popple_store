import { useEffect, useState } from "react";
import { helpAPI } from "../api/services/Help"; // 수정된 helpAPI 가져오기
import { useNavigate } from "react-router-dom";

export default function HelpServicePage() {
  const textStyle = "text-[28px] ml-3 font-bold mt-5";
  const [faqs, setFaqs] = useState([]); // FAQ 상태 초기화
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await helpAPI.fetchFAQs(); // 이 메서드는 api/help를 호출해야 함

        console.log("API Response:", response.data); // API 응답 확인
        setFaqs(response.data); // 상태 업데이트
      } catch (error) {
        console.error("Failed to fetch FAQs", error);
      }
    };

    fetchFAQs();
  }, []);

  const handleRowClick = (faqId) => {
    navigate(`/help/detail/${faqId}`); // 클릭 시 상세 페이지로 이동
  };

  return (
    <>
      <h1 className={textStyle}>자주 묻는 질문</h1>
      <hr className="mt-2 mb-0 border-gray-500" />
      {faqs.length > 0 ? ( // FAQ가 있을 경우
        <table className="mt-0 pb-8 border-separate border-spacing-0 w-full"> {/* border-separate 및 border-spacing 적용 */}
          <tbody >
            {faqs.map((faq) => (
              <tr
                key={faq.id}
                onClick={() => handleRowClick(faq.id)} // 클릭 이벤트
                className="cursor-pointer hover:bg-gray-100"
              >
                <td className="border-b border-gray-300 px-4 py-3  flex justify-between items-center"> 
                  <span>Q .  {faq.title}</span>
                  <span className="text-[21px]">&gt;  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>FAQ가 없습니다.</p> // FAQ가 없을 때 메시지
      )}
      <h1 className={textStyle}>1:1 문의</h1>
      <hr className="mt-2 mb-0 border-gray-500" />
    </>
  );
}
