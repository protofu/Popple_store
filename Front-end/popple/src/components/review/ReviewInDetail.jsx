import ReviewItem from "./ReviewItem";

export default function ReviewInDetail() {
  const h1Style = "font-bold text-[1.25rem]";
  return (
    <div className="flex flex-col gap-8 mb-[2rem] mx-12 mt-12">
      <div>
        <h1 className={h1Style}>주의사항</h1>
        <p className="m-6 text-[14px]">게시판 운영 규정에 어긋난다고 판단되는 게시글은 사전 통보없이 블라인드 처리될 수 있습니다.
        사전 경고에도 불구하고 불량 게시물을 계속적으로 게재한 게시자의 경우 인터파크 티켓 게시판 작성 권한이 제한됩니다.</p>
      </div>
      <div>
        <div className="grid grid-cols-[2fr_4fr_2fr] border-b-2 mb-3 p-1">
          <h1 className="font-bold">총 ?개의 리뷰가 있습니다.</h1>
          <h5 className="text-right text-[12px] text-[#a4a4a4] leading-[2] mb-0"><span className="text-[#D36A6A] mr-1">*</span>리뷰는 방문인증이 완료되면 작성할 수 있습니다.</h5>
          <button className="">리뷰 작성하기</button>
        </div>
        <ReviewItem />
      </div>
    </div>
  );
};
