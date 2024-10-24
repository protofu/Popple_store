import { useEffect, useState } from "react";
import { helpAPI } from "../api/services/Help";
import { useLocation } from "react-router-dom";

export default function HelpDetailPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id'); // 쿼리 파라미터에서 id를 가져옴
  const [faq, setFaq] = useState(null);
  const textStyle = "text-[28px] ml-3 font-bold mt-5";

  useEffect(() => {
    const fetchFAQ = async () => {
      if (!id) {
        console.error("No ID provided");
        return;
      }
      
      try {
        const response = await helpAPI.fetchFAQById(id);
        setFaq(response.data);
      } catch (error) {
        console.error("Failed to fetch FAQ", error);
      }
    };

    fetchFAQ();
  }, [id]);

  if (!faq) {
    return <p>Loading...</p>;
  }

  return (
    <>
  <h1 className={textStyle}>{faq.title}</h1>
  <hr className="mt-2 mb-0 border-gray-500" />
  <p className="text-[17px] ml-3 mt-5 mb-5 pt-5">{faq.description}</p>
  <hr className="mt-2 mb-0 border-gray-500 h-full" />
  <hr className="absolute bottom-[20%] left-1/2  w-[80%] transform -translate-x-1/2 border-gray-500" />
  
</>

  );
}
