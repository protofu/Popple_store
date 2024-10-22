import { useParams } from "react-router-dom";
import detailExam from "../assets/detail-exam.png";
import Calendar from "react-calendar";
import moment from "moment";
import momentTZ from "moment-timezone";
import "react-calendar/dist/Calendar.css";
import "./styles/calendar.css";
import { useState } from "react";

export default function DetailPage() {
  const curDate = new Date(); // 현재 날짜
  const [value, onChange] = useState(curDate); // 클릭한 날짜 (초기값으로 현재 날짜 넣어줌)
  const activeDate = moment(value).format('YYYY-MM-DD'); // 클릭한 날짜 (년-월-일))
  const [selectedTime, setSelectedTime] = useState(""); // 선택된 시간 상태
  const [showTimePicker, setShowTimePicker] = useState(false); // 시간 선택 UI 가시성
  const [selectTab, setSelectTab] = useState("이용정보");

  const { id } = useParams();
  console.log(showTimePicker);

  // API 호출로 정보를 받아오고
  // State 값으로 저장

  // 예시 데이터
  const example = {
    id: id,
    exhibitionName: "스폰지밥 25주년 팝업 전시 <스폰지밥 캠핑데이>",
    fee: "20,000",
    sub_title: "",
    detailDescription: "",
    premittedTime: "",
    address: "서울특별시 서대문구 연세로 13 현대백화점 유플렉스 지하2층",
    notice: "",
    field: "",
    grade: "전연령",
    createdAt: "",
    duration: "24.10.18 - 24.10.31",
    poster: detailExam,

  };
  const combinedDateTime = selectedTime ? `${activeDate}T${selectedTime}:00.000Z` : null;
  const momentDateTime = combinedDateTime ? momentTZ(combinedDateTime).tz('Asia/Seoul') : null;
  // "2024-10-22T14:30:00.000Z"

  const handleDateChange = (date) => {
    onChange(date);
    setShowTimePicker(true); // 날짜 선택 시 시간 선택 UI 보이기
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time); // 선택된 시간 업데이트
  };

  const handleTab = (tab) => {
    setSelectTab(tab);
  }

  const timeOptions = ["14:00", "15:00", "16:00"]; // 시간 옵션 배열

  const infoGridStyle = "col-span-1 w-full font-bold text-xl";
  const infoH1GridStyle = "col-span-2 text-[14px] my-auto";
  const tabStyle = "cursor-pointer mr-4 text-center w-[80px]";

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
              <h1 id="location" className={infoH1GridStyle}>{example.fee} 원</h1>
              <label htmlFor="location" className={infoGridStyle}>주의사항</label>
              <h1 id="location" className={infoH1GridStyle}>{example.address}</h1>
            </div>
          </div>
          <div className="mt-8 border-b-2 border-[#868686]">
            <nav className="flex pb-2 ml-4">
              <div className={tabStyle} onClick={() => handleTab("이용정보")}>이용정보</div>
              <div className={tabStyle} onClick={() => handleTab("리뷰")}>리뷰</div>
              <div className={tabStyle} onClick={() => handleTab("EVENT")}>EVENT</div>
            </nav>
          </div>
          <div className="flex justify-center mt-4">
            {selectTab === "이용정보" && <span>1</span>}
            {selectTab === "리뷰" && <span>2</span>}
            {selectTab === "EVENT" && <span>3</span>}
          </div>
          <div>
            방문통계 자~리
          </div>
        </div>
        {/* 캘린더 */}
        <div className="col-span-2 mx-auto">
          <Calendar 
            onChange={handleDateChange}   // 날짜 변경시 저장
            formatDay={(local, date) => moment(date).format("D")} // 요일 형식 변환
            calendarType="gregory"  // 그레고리를 통한 토요일 시작
            value={value} // 선택된 value값 (default 오늘)
            showNeighboringMonth={true} // 다음달 날짜도 보이게
          /> 
          {showTimePicker && (
            <div className="mt-4 flex space-x-4">
              {timeOptions.map((time) => (
                <button
                  key={time}
                  className={`px-4 py-2 rounded-lg 
                    ${selectedTime === time ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}
                    hover:bg-blue-500 hover:text-white transition`}
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          )}
          <div className="text-gray-500 mt-4">
            {showTimePicker ? (
              // 시간이 선택되었을 경우
              `${moment(value).format("YYYY년 MM월 DD일")} ${selectedTime} 선택됨`
            ) : (
              // 시간이 선택되지 않았을 경우
              moment(value).format("YYYY년 MM월 DD일")
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
