import { useEffect, useState } from "react";
import { helpAPI } from "../api/services/Help";
import { useNavigate } from "react-router-dom";

export default function HelpServicePage() {
  const textStyle = "text-[28px] ml-3 font-bold mt-5";
  const [faqs, setFaqs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await helpAPI.fetchFAQs();
        console.log("API Response:", response.data);
        setFaqs(response.data);
      } catch (error) {
        console.error("Failed to fetch FAQs", error);
      }
    };

    fetchFAQs();
  }, []);

  const handleRowClick = (faqId) => {
    navigate(`/help/detail?id=${faqId}`); // 쿼리 파라미터로 이동
  };
  
  


  return (
    <>
      <h1 className={textStyle}>자주 묻는 질문</h1>
      <hr className="mt-2 mb-0 border-gray-500" />
      {faqs.length > 0 ? (
        <table className="mt-0 pb-8 border-separate border-spacing-0 w-full">
          <tbody>
            {faqs.map((faq) => (
              <tr
                key={faq.id}
                onClick={() => handleRowClick(faq.id)}
                className="cursor-pointer hover:bg-gray-100"
              >
                <td className="border-b border-gray-300 px-4 py-3 flex justify-between items-center">
                  <span>Q. {faq.title}</span>
                  <span className="text-[21px]">&gt; </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>FAQ가 없습니다.</p>
      )}
      <h1 className={textStyle}>1:1 문의</h1>
      <hr className="mt-2 mb-0 border-gray-500" />
    </>
  );
}
