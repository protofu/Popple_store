import { useState } from "react";
import { useForm } from "react-hook-form";
import { qrAPI } from "../api/services/QR";

export default function QRPage() {
  const { register, handleSubmit } = useForm();
  const [imageData, setIamgeData] = useState(null);

  const onSubmit = async (data) => {
    try {
      const res = await qrAPI.getQR(data.link);
      const imageUrl = URL.createObjectURL(res.data);
      setIamgeData(imageUrl);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  }
  // QR에는 팝업 아이디를 담아서 넘겨줘야한다.
  // 공통으로 User정보는 자동으로 넘어가고 팝업 ID 는 RequestParam으로 넘어간다.
  // 예약한 사용자는 예약 목록에서 찾아서 바꿔주면 되는데
  // 일반 방문자는 어떻게 하지?

  return (
    <div className="flex flex-col justify-center items-center w-full h-full mt-[30px]">
      <h1>QR연결 페이지</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="url" placeholder="주소" {...register("link")} />
        <button>입력</button>
      </form>
      {imageData ?
        <img src={imageData} alt="QR code" /> : ""
      }
    </div>
  );
};
