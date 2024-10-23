import { TbCircleNumber1, TbCircleNumber1Filled, TbCircleNumber2, TbCircleNumber2Filled, TbCircleNumber3, TbCircleNumber3Filled } from "react-icons/tb";

const ExhibitionHeader = ({ step }) => {
  return (
    <>
      { step === 1 ? <TbCircleNumber1Filled className="text-8xl inline-block text-popple"/> : <TbCircleNumber1 className="text-8xl inline-block"/>}
      { step === 2 ? <TbCircleNumber2Filled className="text-8xl inline-block"/> : <TbCircleNumber2 className="text-8xl inline-block"/>}
      { step === 3 ? <TbCircleNumber3Filled className="text-8xl inline-block"/> : <TbCircleNumber3 className="text-8xl inline-block"/>}

      <p className="text-lg mb-2">팝업/전시 등록</p>
      <hr className="w-full" />
      <div className="mt-2">{step === 1 ? "기본 정보" : step === 2 ? "판매 정보" : "완료"}</div>
    </>
  );
}

export default ExhibitionHeader;