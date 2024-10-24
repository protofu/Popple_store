import reviewImg from "../../assets/review-img.png";

export default function ReviewItem({ review }) {
  const createdAt = review.createdAt; // createdAt 배열
  
  // 배열에서 각 요소를 추출
  const [year, month, day, hour, minute] = createdAt;
  const date = new Date(year, month - 1, day, hour, minute); // month는 0부터 시작하므로 -1

  // 연도, 월, 일, 시, 분 형식
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  
  // 이미지 불러오기
  const imageUrl = `${import.meta.env.VITE_SERVER}/review_image/${review.image?.savedName}`;
  console.log(imageUrl);

  return (
    <div className="grid grid-cols-[1fr_4fr] border-2 border-[#A4A4A4] rounded-[0.4rem] p-3 m-5 mb-1 h-[148px]">
      <div className=" w-[150px] h-[120px]">
        { review.image?.savedName && 
          <img src={imageUrl} alt="리뷰이미지" className="h-full w-full border-2 border-[#A4A4A4] rounded-[0.8rem]" />
        }
      </div>
      <div className="mx-5">
        <h1 className="mb-2 text-[14px] text-[#A4A4A4]">{review.userNickName} | {formattedDate}</h1>
        <p className="text-[14px]">{review.content}</p>
      </div>
    </div>
  );
};
