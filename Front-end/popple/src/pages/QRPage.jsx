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
  return (
    <>
      <h1>QR연결 페이지</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="url" placeholder="주소" {...register("link")} />
        <button>입력</button>
      </form>
      {imageData ?
        <img src={imageData} alt="QR code" /> : ""
      }
    </>
  );
};
