import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { helpAPI } from "../api/services/Help"; // 수정된 helpAPI 가져오기

export default function HelpDetailPage() {
  const { id } = useParams(); // URL에서 id 가져오기
  const [faq, setFaq] = useState(null); // FAQ 상태 초기화
  const textStyle = "text-[28px] ml-3 font-bold mt-5";

  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const response = await helpAPI.fetchFAQById(id); // 특정 FAQ를 가져오는 API 호출
        setFaq(response.data); // 상태 업데이트
      } catch (error) {
        console.error("Failed to fetch FAQ", error);
      }
    };

    fetchFAQ();
  }, [id]);

  if (!faq) return <p>Loading...</p>; // FAQ가 없으면 로딩 메시지 표시

  return (
    <div>
      <h1 className={textStyle}>{faq.title}</h1>
      <hr className="mt-2 mb-0 border-gray-500" />
      <p className="mt-4">{faq.description}</p> {/* FAQ 설명 표시 */}
    </div>
  );
}
