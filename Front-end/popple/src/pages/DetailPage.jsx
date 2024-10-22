import { useParams } from "react-router-dom";
import detailExam from "../assets/detail-exam.png";

export default function DetailPage() {
  const { id } = useParams();

  // API 호출로 정보를 받아오고
  // State 값으로 저장

  // 예시 데이터
  const example = {
    id: id,
    exhibitionName: "스폰지밥 25주년 팝업 전시 <스폰지밥 캠핑데이>",
    fee: "",
    sub_title: "",
    detailDescription: "",
    premittedTime: "",
    address: "서울특별시 서대문구 연세로 13 현대백화점 유플렉스 지하2층",
    notice: "",
    field: "",
    grade: "",
    createdAt: "",
    duration: "24.10.18 - 24.10.31",
    poster: detailExam,

  };

  const infoGridStyle = "col-span-1";
  const infoH1GridStyle = "col-span-2";

  return (
    <div className="mt-10">
      <h1 className="text-2xl m-10">{example.exhibitionName}</h1>
      <div className="grid grid-cols-7 w-full mt-6">
        {/* 정보 */}
        <div className="col-span-5">
          {/* 타이틀 아래 div들 */}
          <div className="grid grid-cols-2">
            {/* 포스터 */}
            <div className="">
              <img src={example.poster} alt="포스터 이미지" className="w-[70%] mx-auto" />
            </div>
            
            {/* 간략 내용 */}
            <div className="grid grid-cols-3 my-auto gap-14">
              <label htmlFor="location" className={infoGridStyle}>장소</label>
              <h1 id="location" className={infoH1GridStyle}>{example.address}</h1>
              <label htmlFor="location" className={infoGridStyle}>기간</label>
              <h1 id="location" className={infoH1GridStyle}>{example.duration}</h1>
              <label htmlFor="location" className={infoGridStyle}>관람연령</label>
              <h1 id="location" className={infoH1GridStyle}>{example.grade}</h1>
              <label htmlFor="location" className={infoGridStyle}>입장료</label>
              <h1 id="location" className={infoH1GridStyle}>{example.fee}</h1>
              <label htmlFor="location" className={infoGridStyle}>주의사항</label>
              <h1 id="location" className={infoH1GridStyle}>{example.address}</h1>
            </div>
          </div>
        </div>
        {/* 캘린더 */}
        <div className="col-span-2 mx-auto">
          여긴 캘린더 라인
        </div>
      </div>
    </div>
  );
};
