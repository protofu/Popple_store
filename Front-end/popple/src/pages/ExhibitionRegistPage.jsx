import { useEffect, useState } from "react";
import ExhibitionHeader from "../components/exhibition/ExhibitionHeader";
import ExhibitionBodyStep1 from "../components/exhibition/ExhibitionBodyStep1";
import ExhibitionBodyStep2 from "../components/exhibition/ExhibitionBodyStep2";
import ExhibitionBodyStep3 from "../components/exhibition/ExhibitionBodyStep3";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function ExhibitionRegistPage() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch
  } = useForm();
  const onSubmit = async(data) =>{
    try {
      // const res = await 
    } catch (error) {
      
    }
  };
  const handleNavigate = () => {
    navigate('/event-regist');
  }
  return (
    <>
      <ExhibitionHeader step={step} />
      {/* 맨 위 박스  */}
      <div className="flex flex-col w-5/6 mx-auto gap-5 mt-16">
        {step === 1 ? (
          <ExhibitionBodyStep1 />
        ) : step === 2 ? (
          <ExhibitionBodyStep2 />
        ) : (
          <ExhibitionBodyStep3 />
        )}
        <div>
          <hr className="w-full mt-10" />
          {step === 1 ? (
            <div className="flex justify-end">
              <button
                type="submit"
                className="border rounded-lg p-3 mt-10"
                onClick={() => setStep((step) => step + 1)}
              >
                다음
              </button>
            </div>
          ) : step === 2 ? (
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="border rounded-lg p-3 mt-10"
                onClick={() => setStep((step) => step - 1)}
              >
                이전
              </button>
              <button type="submit" className="border rounded-lg p-3 mt-10" onClick={handleNavigate}>
                이벤트 등록
              </button>
              <button
                type="submit"
                className="border rounded-lg p-3 mt-10"
                onClick={() => setStep((step) => step + 1)}
              >
                다음
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="border rounded-lg p-3 mt-10"
                onClick={() => setStep((step) => step - 1)}
              >
                이전
              </button>
              <button
                type="submit"
                className="border rounded-lg p-3 mt-10"
                onClick={() => setStep((step) => step + 1)}
              >
                등록
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
