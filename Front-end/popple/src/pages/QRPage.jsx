import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { qrAPI } from "../api/services/QR";
import { useLocation, useParams } from "react-router-dom";
import { visitAPI } from "../api/services/Visit";

export default function QRPage() {
  const { state: { exhibition } } = useLocation();
  const [imageData, setIamgeData] = useState(null);

  const getQR = async () => {
    try {
      // 팝업/전시 ID 값을 전달하여 QR 코드 생성
      const link = "http://localhost:5173/visit-check/" + exhibition.id
      const res = await qrAPI.getQR(link);
      const imageUrl = URL.createObjectURL(res.data);
      setIamgeData(imageUrl);
    } catch (error) {
      console.err(error);
    }
  }

  useEffect(() => {
    getQR();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full mt-[30px]">
      <h1 className="text-3xl font-bold text-popple-dark mb-5">{exhibition.exhibitionName}</h1>
      <p>QR 코드를 찍고, 입장하세요.</p>
      {imageData ?
        <img src={imageData} alt="QR code" /> : ""
      }
      <div className="flex gap-3">
        <button className="w-24 h-10 bg-popple-light text-white rounded-md" onClick={() => getQR()}>새로고침</button>
        <button className="w-24 h-10 bg-popple-light text-white rounded-md" onClick={() => window.print()}>인쇄</button>
        <button className="w-24 h-10 bg-popple-light text-white rounded-md" onClick={() => window.history.back()}>돌아가기</button>
      </div>
    </div>
  );
};
