import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { visitAPI } from "../api/services/Visit";
import { useLoginStore } from "../stores/LoginState";

export default function VisitCheck() {
  const {isLoggedIn} = useLoginStore();
  const navigate = useNavigate();
  
  if (!isLoggedIn) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full mt-[30px] whitespace-pre-wrap">
        로그인이 필요합니다.
        <button onClick={() => navigate("/login")} className="mt-5 bg-popple-light text-white rounded-md px-3 py-1">로그인</button>
      </div>
    );
  }
  const { id } = useParams();
  const [message, setMessage] = useState("방문 확인중...");
  const checkQR = async () => {
    try {
      const response = await visitAPI.visitCheck(id)
      if (response.status === 200) {
        setMessage("방문 확인되었습니다.\n입장해주세요.");
      }
    } catch (error) {
      console.error(error);
      setMessage("QR코드 확인에 실패했습니다. 관리자에게 문의하세요.");
    }
  };
  useEffect(() => {
    checkQR();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full mt-[30px] whitespace-pre-wrap">
      {message}
    </div>
  );
};
