import { PiNumberCircleOne, PiNumberCircleTwo, PiNumberCircleThree, PiCheckCircleFill  } from "react-icons/pi";

const ExhibitionHeader = ({ step }) => {
  return (
    <>
      <div className="flex items-center my-10 justify-center">
        <div className="justify-center">
          { step === 1 ? <PiNumberCircleOne className="text-8xl inline-block text-popple" /> : <PiCheckCircleFill className="text-8xl inline-block fill-popple"/>}
          <p className="font-bold text-center ">기본정보</p>
        </div>
        {/* 가이드라인 선 */}
        { step === 1 ? <hr className="flex-grow border border-[#ccc]"/> : <hr className="flex-grow border border-popple w-auto"/>}
        <div>
          { step === 1 ? <PiNumberCircleTwo className="text-8xl inline-block  w-auto opacity-20"/> : step === 2 ?  <PiNumberCircleTwo className="text-8xl inline-block text-popple"/> : <PiCheckCircleFill className="text-8xl inline-block fill-popple"/>}
          { step === 1 ? <p className="font-bold text-center opacity-20">판매정보</p> :  <p className="font-bold text-center">판매정보</p> }
        </div>
         {/* 가이드라인 선 */}
        { step === 1 ? <hr className="flex-grow border border-[#ccc] w-auto"/> : step === 2 ? <hr className="flex-grow border border-[#ccc] w-auto"/> : <hr className="flex-grow border border-popple w-auto"/> }
        <div>
          { step === 3 ? <PiNumberCircleThree className="text-8xl inline-block text-popple"/> : <PiNumberCircleThree className="text-8xl inline-block  w-auto opacity-20"/>}
          { step ===3 ? <p className="font-bold  text-center">완료</p> : <p className="font-bold text-center opacity-20">완료</p> }
        </div>
      </div>
      <p className="text-lg mb-2">팝업/전시 등록</p>
      <hr className="w-full" />
      <div className="mt-2">{step === 1 ? "기본 정보" : step === 2 ? "판매 정보"  : "완료"}</div>
    </>
  );
}

export default ExhibitionHeader;