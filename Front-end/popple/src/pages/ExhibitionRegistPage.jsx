import { useEffect, useState } from "react";
import ExhibitionHeader from "../components/exhibition/ExhibitionHeader";
import ExhibitionBodyStep1 from "../components/exhibition/ExhibitionBodyStep1";

export default function ExhibitionRegistPage() {
  const [step, setStep] = useState(1);
  return (
    <>
      <ExhibitionHeader step={step} />
      {/* 맨 위 박스  */}
      <div className="flex flex-col w-5/6 mx-auto gap-5 mt-16">
        {
          step === 1 ? <ExhibitionBodyStep1 /> : <></>
        }
        <div>
          <hr className="w-full mt-10" />
          <div className="flex justify-end items-center">
            <button type="submit" className="border rounded-lg p-3 mt-10" onClick={() => setStep(step => step+1)}>
              다음
            </button>
          </div>
        </div>
      </div>
    </>
  );
}


