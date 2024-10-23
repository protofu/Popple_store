import reviewImg from "../../assets/review-img.png";

export default function ReviewItem() {
  return (
    <div className="grid grid-cols-[1fr_4fr] border-2 border-[#A4A4A4] rounded-[0.4rem] p-3 m-5 mb-1 h-[148px]">
      <div className="border-2 border-[#A4A4A4] rounded-[0.8rem] w-[150px] h-[120px]">
        <img src={reviewImg} alt="리뷰이미지" className="h-full w-full" />
      </div>
      <div className="mx-5">
        <h1 className="mb-2 text-[14px] text-[#A4A4A4]">이름 | 작성일자</h1>
        <p className="text-[14px]">“백 번째 리뷰” 정말 재미있게 관람했습니다. 가슴 한켠이 뭉클해지는 전시였어요!! 그럼 저는 백 한번째 리뷰겠네요! 푸하하</p>
      </div>
    </div>
  );
};
