import Calendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import "./styles/calendar.css";
import { useEffect, useState } from "react";
import UseInfo from "../components/exhi-details/UseInfo";
import axios from "axios";
import ReviewInDetail from "../components/review/ReviewInDetail";
import Reservation from "../components/exhibition/Reservation";
import { exhibitionAPI } from "../api/services/Exhibition";
import { useParams } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { likeAPI } from "../api/services/Like";

function dateToString(arr) {
  const [y,m,d] = arr;
  return y+"."+m+"."+d;
}

export default function DetailPage() {
  const curDate = new Date(); // 현재 날짜
  const [value, onChange] = useState(moment(curDate).format('YYYY-MM-DD'));
  const [selectTab, setSelectTab] = useState("이용정보");
  
  const { id } = useParams();
  
  // 좋아요
  const [isLiked, setIsLiked] = useState(false);
  const handleClickLike = () => {
    setIsLiked(prev => !prev);
  }


  useEffect(() => {
    const likeData = async () => {
      const res = await likeAPI.amILiked(id);
      console.log("잉", res);
      setIsLiked(res.data);
    };
    likeData();
    console.log(isLiked);
  }, [isLiked]);

  // json데이터 담을 state
  const [exhi, setExhi] = useState(null);
  const [chartData, setChartData] = useState(null);

  // 모달 상태
  const [showReservationModal, setShowReservationModal] = useState(false);


  // 예시 데이터
  useEffect(() => {
    const axiosData = async () => {
      try {
        // axios로 public 폴더에 있는 JSON 파일 불러오기
        const resDetail = await exhibitionAPI.get(id);
        const resChartData = await axios.get('/jsons/visitors.json');
        setExhi(resDetail.data); // 불러온 데이터를 상태에 저장
        setChartData(resChartData.data);
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    };

    axiosData(); // 비동기 함수 호출
  }, []);

  if (!exhi) {
    return <div>Loading...</div>; // 데이터 로딩 중 표시
  }

  if (!chartData) {
    return <div>Loading...</div>; // 데이터 로딩 중 표시
  }

  const handleDateChange = (date) => {
    onChange(date);
  };

  const handleTab = (tab) => {
    setSelectTab(tab);
  }

  const openModal = () => setShowReservationModal(true);
  const closeModal = () => setShowReservationModal(false);

  // 날짜
  const startAt = dateToString(exhi.startAt);
  const endAt = dateToString(exhi.endAt);

  const infoGridStyle = "col-span-1 w-full font-bold text-xl";
  const infoH1GridStyle = "col-span-2 text-[14px] my-auto";
  const tabStyle = "cursor-pointer mr-4 text-center w-[80px]";

  return (
    <div className="mt-10 h-full">
      <h1 className="text-2xl m-10 font-bold">{exhi.exhibitionName}</h1>
      <div className="grid grid-cols-7 w-full mt-6">
        {/* 정보 */}
        <div className="col-span-5">
          {/* 타이틀 아래 div들 */}
          <div className="grid grid-cols-2">
            {/* 포스터 */}
            <div className="">
              <img src={`http://localhost:8080/poster/${exhi.savedImage}`} alt="포스터 이미지" className="w-[70%] mx-auto" />
            </div>
            
            {/* 간략 내용 */}
            <div className="grid grid-cols-3 my-auto gap-14">
              <label htmlFor="location" className={infoGridStyle}>장소</label>
              <h1 id="location" className={infoH1GridStyle}>{exhi.address}</h1>
              <label htmlFor="location" className={infoGridStyle}>기간</label>
              <h1 id="location" className={infoH1GridStyle}>{startAt + " - " + endAt}</h1>
              <label htmlFor="location" className={infoGridStyle}>관람연령</label>
              <h1 id="location" className={infoH1GridStyle}>{exhi.grade ? "전연령" : "청소년 관람 불가"}</h1>
              <label htmlFor="location" className={infoGridStyle}>입장료</label>
              <h1 id="location" className={infoH1GridStyle}>
                {exhi.fee !== "0" ? (
                  <span>{exhi.fee} 원</span>
                ) : (
                  <span className="font-bold">입장료 무료</span>
                )}
              </h1>
            </div>
          </div>
          <div className="mt-10 border-b-2 border-[#868686] flex justify-between">
            <nav className="flex pb-2 ml-4">
              <div className={tabStyle} onClick={() => handleTab("이용정보")}>이용정보</div>
              <div className={tabStyle} onClick={() => handleTab("리뷰")}>리뷰</div>
              <div className={tabStyle} onClick={() => handleTab("EVENT")}>EVENT</div>
            </nav>
            <div className="flex gap-4 mr-5 mb-1">
              <div onClick={() => handleClickLike()}>{isLiked ? <FaHeart className="text-red-500 text-[32px]"/> : <FaRegHeart className="text-red-500 text-[32px]"/>}</div>
              <div>구독</div>
              <div>알람설정</div>
            </div>
          </div>
          <div className="mt-4">
            {selectTab === "이용정보" && <UseInfo data={exhi} chart={chartData} />}
            {selectTab === "리뷰" && <ReviewInDetail />}
            {selectTab === "EVENT" && <span>3</span>}
          </div>
        </div>
        {/* 캘린더 */}
        <div className="col-span-2 mx-auto">
          <h1>예약하기</h1>
          <Calendar 
            onChange={(date) => handleDateChange(date)}   // 날짜 변경시 저장
            formatDay={(local, date) => moment(date).format("D")} // 요일 형식 변환
            calendarType="gregory"  // 그레고리를 통한 토요일 시작
            value={value} // 선택된 value값 (default 오늘)
            showNeighboringMonth={true} // 다음달 날짜도 보이게
          /> 
          <div className="text-gray-500 mt-4">
            { value &&
              moment(value).format("YYYY년 MM월 DD일")
            }
          </div>
          <div className="bg-popple-light rounded-lg mx-2 my-3 py-2 shadow-xl cursor-pointer" onClick={openModal}>
            <p className="text-center text-white text-[1rem]">예약하기</p>
          </div>
          {showReservationModal && ( 
            <Reservation reservation={moment(value).format('YYYY-MM-DD')} exhi={exhi} onClose={closeModal}/>
          )}
        </div>
      </div>
    </div>
  );
};

