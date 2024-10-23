// import { useParams } from "react-router-dom";
import detailExam from "../assets/detail-exam.png";
import Calendar from "react-calendar";
import moment from "moment";
// import momentTZ from "moment-timezone";
import "react-calendar/dist/Calendar.css";
import "./styles/calendar.css";
import { useEffect, useState } from "react";
import UseInfo from "../components/exhi-details/UseInfo";
import axios from "axios";

export default function DetailPage() {
  const curDate = new Date(); // 현재 날짜
  const [value, onChange] = useState(curDate); // 클릭한 날짜 (초기값으로 현재 날짜 넣어줌)
  // const activeDate = moment(value).format('YYYY-MM-DD'); // 클릭한 날짜 (년-월-일))
  const [selectedTime, setSelectedTime] = useState(""); // 선택된 시간 상태
  const [showTimePicker, setShowTimePicker] = useState(false); // 시간 선택 UI 가시성
  const [selectTab, setSelectTab] = useState("이용정보");
  
  // json데이터 담을 state
  const [data, setData] = useState(null);
  const [chartData, setChartData] = useState(null);

  // const { id } = useParams();
  // API 호출로 정보를 받아오고
  // State 값으로 저장

  // 예시 데이터
  useEffect(() => {
    const axiosData = async () => {
      try {
        // axios로 public 폴더에 있는 JSON 파일 불러오기
        const resDetail = await axios.get('/jsons/detail.json');
        const resChartData = await axios.get('/jsons/visitors.json');
        resDetail.data.poster = detailExam;
        setData(resDetail.data); // 불러온 데이터를 상태에 저장
        setChartData(resChartData.data);
        console.log("리스폰", data);
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    };

    axiosData(); // 비동기 함수 호출
  }, []);

  if (!data) {
    return <div>Loading...</div>; // 데이터 로딩 중 표시
  }

  if (!chartData) {
    return <div>Loading...</div>; // 데이터 로딩 중 표시
  }


  // const combinedDateTime = selectedTime ? `${activeDate}T${selectedTime}:00.000Z` : null;
  // const momentDateTime = combinedDateTime ? momentTZ(combinedDateTime).tz('Asia/Seoul') : null;
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
      <h1 className="text-2xl m-10">{data.exhibitionName}</h1>
      <div className="grid grid-cols-7 w-full mt-6">
        {/* 정보 */}
        <div className="col-span-5">
          {/* 타이틀 아래 div들 */}
          <div className="grid grid-cols-2">
            {/* 포스터 */}
            <div className="">
              <img src={data.poster} alt="포스터 이미지" className="w-[70%] mx-auto" />
            </div>
            
            {/* 간략 내용 */}
            <div className="grid grid-cols-3 my-auto gap-14">
              <label htmlFor="location" className={infoGridStyle}>장소</label>
              <h1 id="location" className={infoH1GridStyle}>{data.address}</h1>
              <label htmlFor="location" className={infoGridStyle}>기간</label>
              <h1 id="location" className={infoH1GridStyle}>{data.duration}</h1>
              <label htmlFor="location" className={infoGridStyle}>관람연령</label>
              <h1 id="location" className={infoH1GridStyle}>{data.grade}</h1>
              <label htmlFor="location" className={infoGridStyle}>입장료</label>
              <h1 id="location" className={infoH1GridStyle}>{data.fee} 원</h1>
              <label htmlFor="location" className={infoGridStyle}>주의사항</label>
              <h1 id="location" className={infoH1GridStyle}>{data.address}</h1>
            </div>
          </div>
          <div className="mt-8 border-b-2 border-[#868686]">
            <nav className="flex pb-2 ml-4">
              <div className={tabStyle} onClick={() => handleTab("이용정보")}>이용정보</div>
              <div className={tabStyle} onClick={() => handleTab("리뷰")}>리뷰</div>
              <div className={tabStyle} onClick={() => handleTab("EVENT")}>EVENT</div>
            </nav>
          </div>
          <div className="mt-4">
            {selectTab === "이용정보" && <UseInfo data={data} chart={chartData} />}
            {selectTab === "리뷰" && <span>2</span>}
            {selectTab === "EVENT" && <span>3</span>}
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
